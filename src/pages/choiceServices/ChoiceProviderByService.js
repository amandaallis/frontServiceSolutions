import React, { useState } from "react";
import { View, FlatList, LogBox, StyleSheet } from "react-native";
import CardService from "../../components/CardService";
import { Text } from "react-native-paper";
import LottieView from "lottie-react-native";

const ChoiceProviderByService = ({ navigation, route }) => {
  const { providers, service, token } = route.params.params.data;
  const [selectedItem, setSelectedItem] = useState(null);

  const data = {
    item: selectedItem,
    providers,
    token
  };

  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested'
  ]);

  const renderCardService = ({ item }) => (
    <CardService
      text={'Solicitar serviço'}
      typeService={service}
      nameClient={item.userName}
      local={item.city}
      number={item.phone}
      onPress={() => {
        setSelectedItem(item);
        navigation.navigate('NewService', { ...data, item });
      }}
    />
  );

  return (
    providers.length === 0 ?
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/noDataSeach.json")}
        style={{ width: 3000, height: 250}}
        autoPlay
        speed={0.8}
      />
    </View> :
    <View style={{ flex: 1 }}>
      <FlatList
        data={providers}
        renderItem={renderCardService}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  }
});

export default ChoiceProviderByService;
