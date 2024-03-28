import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';

const Register = ({navigation}) => {

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Ainda não é cadastrado?</Text>
        <Text style={styles.text}>Crie sua conta agora mesmo!</Text>
        <Text style={styles.textIam}>Eu sou: </Text>
        <View style={styles.buttonView}>
            <CustomButton label="Pessoa jurídica" onPress={() => {navigation.navigate('LegalProvider')}} />
            <CustomButton label="Pessoa física" onPress={() =>  {navigation.navigate('LegalProvider')}} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2D4B73',
    },
    image: {
      marginTop: 0,
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    textIam: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginTop: 20,
  },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 16,
    },
});

export default Register;
