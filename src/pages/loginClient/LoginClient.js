import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert } from 'react-native';
import ButtonLogin from '../../components/ButtonLogin';
import { TextInputMask } from 'react-native-masked-text';
import providerClient from '../../services/ProviderClient';
import { ActivityIndicator, TextInput as PaperTextInput } from 'react-native-paper';


const LoginClient = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isCorrectPhone, setIsCorrectPhone] = useState(true);
  const [isCorrectPass, setIsCorrectPass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hidePass, setHidePass] = useState(true);

  const togglePasswordVisibility = () => {
    setHidePass(!hidePass);
  };

  const onChangePhone = (value) => {
    setIsLoading(false)
    setPhone(value)

    if (value.length == 14) {

      setIsCorrectPhone(true);
    } else {
      setIsCorrectPhone(false);
    }
  }

  const onChangePass = (value) => {
    setIsLoading(false)
    setPassword(value)
    if (value.length > 0) {
      setIsCorrectPass(true);
    } else {
      setIsCorrectPass(false);
    }
  }

  const handleSignIn = async () => {
    try {
      const data = {
        phone,
        password
      };
      setIsLoading(true);

      const response = await providerClient.login(data);
      
      if(response && response.status == 200) {
        navigation.navigate('ServicesHome', { 
          screen: 'Home', 
          params: { token: response.data.token } 
        });       
      }  
    } catch (error) {
      Alert.alert("Dados errados, tente novamente");
      setIsLoading(false);
      console.log(error.response);
    }
    finally {
      setIsLoading(false)
      setIsCorrectPhone(true);
      setIsCorrectPass(true)
    }
  };
  
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/logoLogin.png')}
      />
  
      <Text style={styles.welcomeText}>Seja bem-vindo(a)!</Text>
      <Text style={styles.welcomeTextSecond}>Acesse sua conta!</Text>

      <View>
        <Text style={styles.textLabel}>Telefone</Text>
        <TextInputMask
          style={styles.input}
          type={'cel-phone'}
          options={{ maskType: 'BRL', withDDD: true, dddMask: '(99)' }}
          value={phone}
          onChangeText={onChangePhone}
          placeholder="Digite aqui seu telefone"
        />
        
       {!isCorrectPhone && <Text style={{ color: '#EFFE0B' }}>O número de telefone é obrigatório</Text>}
      </View>

      <View>
        <Text style={styles.textLabel}>Senha:</Text>
        <PaperTextInput
          style={styles.input}
          value={password}
          onChangeText={onChangePass}
          maxLength={30}
          secureTextEntry={hidePass}
          placeholder="Digite aqui sua senha"
          autoCapitalize="none"
          right={<PaperTextInput.Icon icon={hidePass ? "eye" : "eye-off"} onPress={togglePasswordVisibility} />}
        />
       {!isCorrectPass && <Text style={{ color: '#EFFE0B' }}>Senha é obrigatória</Text>}
      </View>

      <ButtonLogin text="Acessar" onPress={handleSignIn} />
      <Text style={{color: '#FFFFFF', marginTop: 10}}>Ainda não é cadastrado?</Text>
      <Text style={{color: '#FFFFFF', marginTop: 5}} onPress={() => navigation.navigate('RegisterClientPagOn')}>Crie sua conta agora mesmo!</Text>
      {isLoading && <ActivityIndicator size="large" color="#FFFFFF" />}
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
  textLabel: {
    color: '#FFFF',
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  image: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  welcomeTextSecond: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#FFFF',
    width: 310,
    height: 40,
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default LoginClient;
