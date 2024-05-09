import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import CardService from '../../components/CardService';
import ChoiceServices from '../choiceServices/ChoiceServices';
import providerServices from '../../services/ProviderServices';

const ServicesHome = ({ route, navigation }) => {
  console.log('====================================');
  console.log("OLHA O TOKEEEEEEEEN");
  console.log('====================================');
  const {token } = route.params;
  console.log(token)
  console.log("SERVICES HOME")
  const [type, setType] = useState('')
  console.log(token)

  const typeUser = async () => {
    try {
        const response = await providerServices.getUserInfo(token);
        console.log("Esse é o response")
        console.log(response.data)

        if(response.data.requesterId == null) {
          console.log("é provider")
          setType('provider')
        } 
        
        else if(response.data.requesterId !== null) {
          console.log("é requester")
          setType('requester')
        }
    } catch (error) {
        console.log(error)
    }
}

useEffect (() => {
  typeUser();
}, [])
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.background}>
       {/*} <CardService
          typeService={'Chapeiro'}
          local={'Campo Mourão'}
          nameClient={'Amanda'}
          number={'(44) 99101-66665'}
  />*/}
  {type == 'requester'? <ChoiceServices token={token} /> : ''}
       
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  background: {
    height:' 100%',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ServicesHome;
