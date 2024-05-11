import React, { useState } from "react";
import { View, FlatList } from "react-native";
import CardService from "../../components/CardService";
import { Text } from "react-native-paper";

const ChoiceProviderByService = ({ navigation, route }) => {
  const { providers, service, token } = route.params.params.data;
  const [item, setItem] = useState();

  const data = {
    item,
    providers,
    token
  }

  const renderCardService = ({ item }) => (
      <CardService
        text={'Solicitar serviço'}
        typeService={service}
        nameClient={item.userName}
        local={item.city}
        number={item.phone}
        onPress={() => navigation.navigate('NewService', data )}
    />
  )
    
  return (
    providers.length === 0 ? 
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>No data found</Text>
      </View>:
        <View style={{ flex: 1 }}>
          <FlatList
            data={providers}
            renderItem={renderCardService}
            keyExtractor={(item) => {
              setItem(item)
              item.id.toString()}
            }
          />
        </View>
    );  
};

export default ChoiceProviderByService;
