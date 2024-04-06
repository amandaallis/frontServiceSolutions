import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";
import ButtonLogin from "../../components/ButtonLogin";

const LegalProvider = ({navigation}) => {

    const [cnpj, setCnpj] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [isCorrectCnpj, setIsCorrectCnpj] = useState(true);
    const [isCorrectRazaoSocial, setIsCorrectRazaoSocial] = useState(true)

    const onChangeCnpj = (value) => {
        if (value.length == 18) {
            setCnpj(value)
            setIsCorrectCnpj(true)

        } else {
            setIsCorrectCnpj(false)
        }  
    }

    const onChangeRazaoSocial = (value) => {
        setRazaoSocial(value)
        if (value.length > 5) {
            setIsCorrectRazaoSocial(true)

        } else {
            setIsCorrectRazaoSocial(false)
        }  
    }

    const canNavigate = () => {
        if(isCorrectCnpj && cnpj !== '' && isCorrectRazaoSocial) {
            navigation.navigate('LegalProviderDois',  {
                cnpj: cnpj,
                razaoSocial: razaoSocial
            })
        }
    
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

        {!isCorrectCnpj?  <Text style={{ color: '#EFFE0B' }}>Cnpj inválido</Text> : ''}

        <Text style={styles.textLabel}>Razão Social</Text>
        <TextInput
            style={styles.input}
            value={razaoSocial}
            onChangeText={onChangeRazaoSocial}
            maxLength={70}
            placeholder={"Razão Social"}
        />

        {!isCorrectRazaoSocial?  <Text style={{ color: '#EFFE0B' }}>Campo obrigatório</Text> : ''}
        
      </View>

      <ButtonLogin text={"Próximo"} onPress={canNavigate}/>
      
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
