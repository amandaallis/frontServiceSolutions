import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Alert } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import ButtonLogin from "../../components/ButtonLogin";
import providerServices from "../../services/ProviderServices";

const RegisterPersonalOne = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [isCorrectEmail, setIsCorrectEmail] = useState(true);
  const [isCorrectPhone, setIsCorrectPhone] = useState(true);
  const [isCorrectName, setIsCorrectName] = useState(true);
  const [isCorrectCpf, setIsCorrectCpf] = useState(true);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false;
    }
    return true;
  };

  const onChangeName = (value) => {
    setName(value);
    setIsCorrectName(value.length > 8);
  };

  const onChangeEmail = async (email) => {
    setEmail(email);
    if (validateEmail(email)) {
      try {
        const { data } = await providerServices.alredyExistEmail(email);
        setIsCorrectEmail(!data);
        if (data) {
          Alert.alert("E-mail já cadastrado");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsCorrectEmail(false);
    }
  };

  const onChangePhone = async (value) => {
    setPhone(value);
    if (value.length === 14) {
      try {
        const { data } = await providerServices.alredyExistPhone(value);
        setIsCorrectPhone(!data);
        if (data) {
          Alert.alert("Celular já cadastrado");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsCorrectPhone(false);
    }
  };

  const onChangeCpf = (value) => {
    setCpf(value);
    setIsCorrectCpf(validateCPF(value));
  };

  const canNavigate = () => {
    if (isCorrectEmail && email !== '' && isCorrectPhone && phone !== '' && isCorrectName && name !== '' && isCorrectCpf && cpf !== '') {
      navigation.navigate('RegisterPersonTwo', {
        name, phone, email, cpf
      });
    } else {
      Alert.alert("Por favor, preencha todos os campos corretamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/logoCadastro.png')} />
      <Text style={styles.text}>Ainda não é cadastrado?</Text>
      <Text style={styles.containerText}>Crie sua conta agora mesmo!</Text>

      <View>
        <Text style={styles.textLabel}>Nome</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={onChangeName}
          maxLength={70}
          placeholder="Nome"
        />
        {!isCorrectName && <Text style={{ color: '#EFFE0B' }}>Campo obrigatório</Text>}

        <Text style={styles.textLabel}>Telefone</Text>
        <TextInputMask
          style={styles.input}
          type={'cel-phone'}
          options={{ maskType: 'BRL', withDDD: true, dddMask: '(99)' }}
          value={phone}
          onChangeText={onChangePhone}
          placeholder="Digite aqui seu telefone"
        />
        
        {!isCorrectPhone && <Text style={{ color: '#EFFE0B' }}>Telefone inválido</Text>}

        <Text style={styles.textLabel}>CPF</Text>
        <TextInputMask
          style={styles.input}
          type={'cpf'}
          value={cpf}
          onChangeText={onChangeCpf}
          placeholder="Digite aqui seu CPF"
        />
        {!isCorrectCpf && <Text style={{ color: '#EFFE0B' }}>CPF inválido</Text>}

        <Text style={styles.textLabel}>E-mail</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Digite seu email"
          onChangeText={onChangeEmail}
          value={email}
          autoCapitalize="none"
        />
        {!isCorrectEmail && <Text style={{ color: '#EFFE0B' }}>Email inválido</Text>}
      </View>
      
      <ButtonLogin text="Próximo" onPress={canNavigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerText: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D4B73',
  },
  image: {
    marginBottom: 50,
  },
  text: {
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
  textLabel: {
    margin: 10,
    color: "#FFF",
  },
});

export default RegisterPersonalOne;
