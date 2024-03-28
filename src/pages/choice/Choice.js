import {Image, StyleSheet, Text, View} from 'react-native';
import ButtonLogin from '../../components/ButtonLogin';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Choice = ({navigation}) => {
  const [teste, setTeste] = useState();

  const renderData = async () => {
    console.log("Antes do data")
    try {
      const data = await axios.get('http://localhost:3000/teste');
      console.log("///////////////////////")
      console.log(data.data)
      console.log("fora do if")
      if (data) {
        setTeste(data.data);
        console.log(teste);
      }
    } catch (err) {
      console.log(err)
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
      console.log(JSON.stringify(err))
    }
    finally {
      console.log("saiu")
    }
  };

  useEffect(() => {
    console.log("entrou no UseEffect")
    renderData()
  }, [])

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/logoInicial.png')}
      />
      <ButtonLogin 
        text={'Sou cliente'}
        onPress={()=> {
          navigation.navigate('Login')
        }}
        
      />
      <ButtonLogin 
        text={'Sou Prestador'}
        onPress={() => {
          navigation.navigate('Login')
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Centralizar horizontalmente
    justifyContent: 'center', // Centralizar verticalmente
    backgroundColor: '#2D4B73',
  },
  image: {
    marginBottom: 50,
  },
});

export default Choice;
