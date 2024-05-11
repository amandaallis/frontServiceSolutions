import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import CardService from "../../components/CardService";
import { Text } from "react-native-paper";
import providerClient from "../../services/ProviderClient";

const ListServicesProvider = ({ token }) => {
  console.log("OLHA O TOKEN")
  console.log(token)
  const [servicesByProvider, setServicesByProvider] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await providerClient.getRequiredServiceByProvider(token);
        setServicesByProvider(response.data);
        console.log("Assim que ficou services provider")
        console.log(servicesByProvider)
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [token]);

  const renderCardService = ({ item }) => (
    <CardService
      text={'Ver solicitação'}
      typeService={item.service}
      nameClient={item.userName}
      local={item.city}
      number={item.phone}
      onPress={() => navigation.navigate('NewService', data )}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      {servicesByProvider.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>No data found</Text>
        </View>
      ) : (
        <FlatList
          data={servicesByProvider}
          renderItem={renderCardService}
          keyExtractor={(item) => {
            console.log("OLha o item")
            console.log(item)
            item.id.toString()
          }}
        />
      )}
    </View>
  );
};

export default ListServicesProvider;
