import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";
import ButtonLogin from "../../components/ButtonLogin";

const LegalProviderTres = ({navigation}) => {
    const [name, setName] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [phone, setPhone] = useState('');
    const [isCorrectPhone, setIsCorrectPhone] = useState(true);
    const [email, setEmail] = useState('');
    const [cidade, setCidade] = useState('');


    const onChangeName = (value) => {
        setName(value);
    };

    const onChangePhone = (value) => {
        if (value.length === 15) { // Considerando o formato "(44) 99999-9999"
            setPhone(value);
            setIsCorrectPhone(true);
        } else {
            setIsCorrectPhone(false);
        }
    };

    const onChangeEmail = (formatted, extracted) => {
        setEmail(extracted);
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../assets/logoCadastro.png')}
            />
                <Text style={styles.text}>Ainda não é cadastrado?</Text>
                <Text style={styles.containerText}>Crie sua conta agora mesmo!</Text>
            
            <View>
                <Text style={styles.textLabel}>Nome: </Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={onChangeName}
                    maxLength={80}
                    placeholder={"Nome"}
                />

            <Text style={styles.textLabel}>Telefone</Text>
                <TextInputMask
                    style={styles.input}
                    type={'cel-phone'}
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99)'
                    }}
                    value={phone}
                    onChangeText={onChangePhone}
                    placeholder="Digite aqui seu telefone"
                />
                <Text style={styles.textLabel}>E-mail: </Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                    maxLength={30}
                    placeholder={"E-mail"}
                />
                
                <Text style={styles.textLabel}>Cidade: </Text>

                <TextInput
                    style={styles.input}
                    value={cidade}
                    onChangeText={(cidade) => setCidade(cidade)}
                    maxLength={30}
                    placeholder={"Cidade"}
                />
            </View>
            <ButtonLogin text={"Próximo"}  
                onPress={()=> {
                navigation.navigate('Login')
        }}/>
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
        color:"#FFF",
    }
});

export default LegalProviderTres;
