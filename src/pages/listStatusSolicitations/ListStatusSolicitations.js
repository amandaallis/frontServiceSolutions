import React, { useState, useCallback } from "react";
import { View, SectionList, LogBox, StyleSheet } from "react-native";
import CardService from "../../components/CardService";
import { Text } from "react-native-paper";
import providerClient from "../../services/ProviderClient";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

const ListStatusSolicitations = ({ route }) => {
  const { token } = route.params;
  console.log("o token")
  console.log(token)
  const navigation = useNavigation();

  const [servicesByProvider, setServicesByProvider] = useState([]);
  const [servicesRejected, setServicesRejected] = useState([]);
  const [loading, setLoading] = useState(true);

  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested'
  ]);

  const fetchServices = async () => {
    try {
      const response = await providerClient.getRequiredServiceByProvider({ token: token, status: "APPROVED" });
      const responseRejected = await providerClient.getRequiredServiceByProvider({ token: token, status: "REJECTED" });

      setServicesByProvider(response.data);
      setServicesRejected(responseRejected.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true); // Set loading to true every time the screen is focused
      fetchServices();
    }, [token])
  );

  const renderCardService = ({ item }) => (
    <CardService
      text={item.status}
      typeService={"Serviços de " + item.serviceName}
      nameClient={item.userName}
      local={item.city}
      number={item.phone}
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
        servicesByProvider.length === 0 && servicesRejected.length === 0 ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>No data found</Text>
          </View>
        ) : (
          <SectionList
            sections={[
              { title: "", data: servicesRejected },
              { title: "", data: servicesByProvider },
            ]}
            renderItem={renderCardService}
            keyExtractor={(item) => item.id.toString()}
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

export default ListStatusSolicitations;
