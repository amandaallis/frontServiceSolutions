import React, { useState, useEffect } from "react";
import { View, FlatList, LogBox } from "react-native";
import CardService from "../../components/CardService";
import { Text } from "react-native-paper";
import providerClient from "../../services/ProviderClient";
import { useNavigation } from "@react-navigation/native";

const ListServicesProvider = ({ token }) => {
  const navigation = useNavigation();

  const [servicesByProvider, setServicesByProvider] = useState([]);
  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested'
  ]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await providerClient.getRequiredServiceByProvider({token});
        setServicesByProvider(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [token]);

  const renderCardService = ({ item }) => (
    <CardService
      text={'Ver solicitação'}
      typeService={"Serviços de " + item.serviceName}
      nameClient={item.userName}
      local={item.city}
      number={item.phone}
      onPress={() => navigation.navigate('ServiceSpecifications', item)}
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
            item.id.toString()
          }}
        />
      )}
    </View>
  );
};

export default ListServicesProvider;
