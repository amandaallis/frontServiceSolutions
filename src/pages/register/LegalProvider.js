import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";
import ButtonLogin from "../../components/ButtonLogin";

const LegalProvider = ({navigation}) => {
    const [cnpj, setCnpj] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');

    const onChangeCnpj = (value) => {
        setCnpj(value)
      }
    return (
    <View style={styles.container}>
        <Image
            style={styles.image}
            source={require('../../assets/logoCadastro.png')}
        />
        <Text style={styles.text}>Ainda não é cadastrado?</Text>
        <Text style={styles.text}>Crie sua conta agora mesmo!</Text>
        <View>
        <Text style={styles.textLabel}>CNPJ</Text>
        <TextInputMask
          style={styles.input}
          type={'cnpj'}
          options={{
            maskType: 'BRL',
          }}
          value={cnpj}
          onChangeText={onChangeCnpj}
          placeholder="Digite aqui seu CNPJ"
        />

        <Text style={styles.textLabel}>Razão Social</Text>

        <TextInput
            style={styles.input}
            value={razaoSocial}
            onChangeText={(text) => setRazaoSocial(text)}
            maxLength={30}
            placeholder={"Razão Social"}
        />
      </View>
      <ButtonLogin text={"Próximo"} onPress={() => navigation.navigate('LegalProviderDois')}/>
      </View>
    );
}

const styles = StyleSheet.create({
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
        color:"#FFF",
    }
});

export default LegalProvider;
