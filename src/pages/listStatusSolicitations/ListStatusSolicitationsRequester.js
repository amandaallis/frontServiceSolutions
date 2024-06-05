import React, { useState, useCallback } from "react";
import { View, SectionList, LogBox, StyleSheet } from "react-native";
import CardService from "../../components/CardService";
import { Text } from "react-native-paper";
import providerClient from "../../services/ProviderClient";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import CardClient from "../../components/CardClient";
import LottieView from "lottie-react-native";

const ListStatusSolicitationsRequester = ({ token }) => {
  const navigation = useNavigation();

  const [servicesByProvider, setServicesByProvider] = useState([]);
  const [loading, setLoading] = useState(true);

  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested'
  ]);

  const fetchServices = async () => {
    try {
      const response = await providerClient.getRequiredServiceByRequester({ token: token});

      console.log("OLHA O FETCH")
      console.log(response.data)
      setServicesByProvider(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchServices();
    }, [token])
  );

  const renderCardService = ({ item }) => (
    <CardClient
      text={item.status}
      typeService={"Serviços de " + item.serviceName}
      nameClient={item.providerName}
      local={item.adress.street + ", " + item.adress.number + ", " +item.adress.district + " " + item.city}
      onPress={() => navigation.navigate('ServiceSpecifications', { ...item, token })}
    />
  );

  return (
    <View style={styles.background}>
      {loading ? (
        <View style={styles.shimmerContainer}>
          {[...Array(5)].map((_, index) => (
            <ShimmerPlaceholder
              key={index}
              style={styles.shimmerPlaceholder}
            />
          ))}
        </View>
      ) : (
        servicesByProvider.length === 0? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <LottieView
              source={require("../../assets/noDataSeach.json")}
              style={{ width: 3000, height: 250}}
              autoPlay
              speed={0.8}
            />
          </View>
        ) : (
          <SectionList
          sections={[
            { title: "", data: servicesByProvider },
          ]}
          renderItem={renderCardService}
          keyExtractor={(item) => item.id.toString()} // Ensure item.id is unique and defined
        />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  shimmerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16
  },
  shimmerPlaceholder: {
    width: 310,
    height: 240,
    marginBottom: 15,
    borderRadius: 8
  },
  sectionHeader: {
    backgroundColor: "#f4f4f4",
    margin: 0,
    padding: 8,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  background: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListStatusSolicitationsRequester;
