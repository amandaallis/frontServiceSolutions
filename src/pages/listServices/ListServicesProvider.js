import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, LogBox, StyleSheet } from "react-native";
import CardService from "../../components/CardService";
import { Text } from "react-native-paper";
import providerClient from "../../services/ProviderClient";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

const ListServicesProvider = ({ token }) => {
  console.log("list services");
  console.log(token);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [servicesByProvider, setServicesByProvider] = useState([]);

  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested'
  ]);

  const fetchServices = async () => {
    try {
      const response = await providerClient.getRequiredServiceByProvider({ token: token, status: "OPEN" });
      setServicesByProvider(response.data);
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
      text={'Ver solicitação'}
      typeService={"Serviços de " + item.serviceName}
      nameClient={item.userName}
      local={item.city}
      number={item.phone}
      onPress={() => navigation.navigate('ServiceSpecifications', { ...item, token })}
    />
  );

  return (
    <View style={{ flex: 1 }}>
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
        servicesByProvider.length === 0 ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>No data found</Text>
          </View>
        ) : (
          <FlatList
            data={servicesByProvider}
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
});

export default ListServicesProvider;
