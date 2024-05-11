import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ChoiceServices from '../choiceServices/ChoiceServices';
import ListServicesProvider from '../listServices/ListServicesProvider';
import providerServices from '../../services/ProviderServices';

const ServicesHome = ({ route, navigation }) => {
  const { token } = route.params;
  const [type, setType] = useState('');

  const typeUser = async () => {
    try {
      const response = await providerServices.getUserInfo(token);
      console.log("olha o responseee")
      console.log(response.data.providerId)
      console.log(response.data.requesterId)


      if (response.data.requesterId !== undefined) {
        console.log("é requester")
        setType('requester');
      }
      else if (response.data.providerId !== undefined) {
        console.log("é provider")
        setType('provider')
     
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    typeUser();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.background}>
        {/* Render ChoiceServices if type is requester, ListServicesProvider if type is provider */}
        {type === 'requester' && <ChoiceServices token={token} />}
        {type === 'provider' && <ListServicesProvider token={token} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  background: {
    flex: 1, // Use flex instead of height for dynamic sizing
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ServicesHome;
