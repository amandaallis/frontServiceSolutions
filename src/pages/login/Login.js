import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import ButtonLogin from '../../components/ButtonLogin';
import providerServices from "../../services/ProviderServices"
import { TextInputMask } from 'react-native-masked-text';

const Login = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isCorrectPhone, setIsCorrectPhone] = useState(true);
  const [isCorrectPass, setIsCorrectPass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onChangePhone = (value) => {
    setIsLoading(false)
    console.log(value)
    if (value.length == 14) {
      setPhone(value)
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
    const data = {
      phone,
      password
    };
  
    console.log(data);
  
    try {
      setIsLoading(true);
      await providerServices.login(data)
        .then((response) => {
          console.log(response.status);

          if(response.status == 200) {
            navigation.navigate('ListServices');
          }
        })
        .catch((error) => {
          setIsLoading(false);
          Alert.alert("Dados errados, tente novamente")
          console.log(error);
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    } catch (error) {
      console.log(error);
    }
    finally {
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
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(44)'
          }}
          value={phone}
          onChangeText={onChangePhone}
          placeholder="Digite aqui seu telefone"
        />
       {!isCorrectPhone && <Text style={{ color: '#EFFE0B' }}>O número de telefone é obrigatório</Text>}
      </View>

      <View>
        <Text style={styles.textLabel}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite aqui sua senha"
          secureTextEntry={true}
          maxLength={30}
          value={password}
          onChangeText={onChangePass}
        />
       {!isCorrectPass && <Text style={{ color: '#EFFE0B' }}>Senha é obrigatória</Text>}
      </View>

      <ButtonLogin text="Acessar" onPress={handleSignIn} />
      <Text style={{color: '#FFFFFF', marginTop: 10}}>Ainda não é cadastrado?</Text>
      <Text style={{color: '#FFFFFF', marginTop: 5}} onPress={() => navigation.navigate('Cadastro')}>Crie sua conta agora mesmo!</Text>
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

export default Login;
