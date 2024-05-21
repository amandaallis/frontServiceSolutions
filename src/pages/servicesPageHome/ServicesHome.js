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
    
      if (response.data.requesterId !== undefined) {
        setType('requester');
      }
      else if (response.data.providerId !== undefined) {
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
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ServicesHome;
