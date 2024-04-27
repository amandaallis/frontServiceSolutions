import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, TextInput, Alert } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import ButtonLogin from "../../components/ButtonLogin";
import providerServices from "../../services/ProviderServices";

const RegisterPersonalOne = ({ navigation }) => {

    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isCorrectEmail, setIsCorrectEmail] = useState(true);
    const [isCorrectPhone, setIsCorrectPhone] = useState(true);
    const [isCorrectName, setIsCorrectName] = useState(true)

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    };

    const onChangeName = (value) => {
        setName(value)
        if (value.length > 8) {
            setIsCorrectName(true)

        } else {
            setIsCorrectName(false)
        }  
    }

    const onChangeEmail = async (email) => {
        setEmail(email);

        if(validateEmail(email)) {
            try {
                const {data} = await providerServices.alredyExistEmail(email);
                if(!data) {
                    setIsCorrectEmail(true);
                } else {
                    Alert.alert("E-mail já cadastrado")
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            setIsCorrectEmail(false);
        }
    };

    const onChangePhone = async (value) => {
        setPhone(value);
        if (value.length === 14) {
            const {data} = await providerServices.alredyExistPhone(value);
            if(!data) {
                setIsCorrectPhone(true);
            } else {
                Alert.alert("Celular já cadastrado")
            }
        } else {
            setIsCorrectPhone(false);
        }
    };

    const canNavigate = () => {
        console.log("Clicou")
    
        if(isCorrectEmail && email !== '' && isCorrectPhone && phone !== '' && name !== '' && isCorrectName) {
            navigation.navigate('RegisterPersonTwo', {
               name, phone, email
            });
        }
    }
    
    return (
        <View style={styles.container}>

            <Image
                style={styles.image}
                source={require('../../assets/logoCadastro.png')}
            />
            <Text style={styles.text}>Ainda não é cadastrado?</Text>
            <Text style={styles.containerText}>Crie sua conta agora mesmo!</Text>

            <View>
                <Text style={styles.textLabel}>Nome</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={onChangeName}
                    maxLength={70}
                    placeholder={"Nome: "}
                />

                {!isCorrectName?  <Text style={{ color: '#EFFE0B' }}>Campo obrigatório</Text> : ''}
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

                    {!isCorrectPhone && <Text style={{ color: '#EFFE0B' }}>Telefone inválido</Text>}
                    
                    <Text style={styles.textLabel}>E-mail: </Text>
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
            <ButtonLogin 
                text={"Próximo"}  
                onPress={canNavigate}
            />
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
    },
    cityList: {
        backgroundColor: '#FFFF',
        width: 310,
        maxHeight: 200,
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    cityFlatList: {
        flexGrow: 0,
    },
    cityItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
});

export default RegisterPersonalOne;
