import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";
import ButtonLogin from "../../components/ButtonLogin";
import providerServices from "../../services/ProviderServices";

const LegalProvider = ({ route, navigation }) => {
    const {email, phone, password, cnpj, companyName, cidade } = route.params;

    const [firstPassword, setFirstPassword] = useState('');
    const [isCorrectFirstPass, setIsCorrectFirstPass] = useState(false);
    const [secondPassword, setSecondPassword] = useState('');
    const [isCorrectPassword, setIsCorrectPassword] = useState(false);

    const onChangeFirstPassword = (value) => {
        setFirstPassword(value);
        setIsCorrectFirstPass(value.length > 6);
    }

    const onChangeSecondPassword = (value) => {
        setSecondPassword(value);
        setIsCorrectPassword(value === firstPassword);
    }

    const loginNextPage = async() => {
        console.log("Entrou no loginNextPage")
        try {
            const loginData = {
                phone: phone,
                password: secondPassword
            };
            console.log('====================================');
            console.log(loginData);
            console.log('====================================');     
            console.log(loginData)
                        
        const loginResponse = await providerServices.login(loginData);  
        console.log(loginResponse)
        if(loginResponse.status === 200) {
        navigation.navigate('TypeServiceChoice', loginResponse.data);
        }
    } catch (loginError) {
        console.log(loginError);
        Alert.alert("Dados errados, tente novamente");
    } 
    }

    const saveData = async () => {
        const data = {
            email: email,
            phone: phone,
            password: secondPassword,
            cnpj: cnpj,
            companyName: companyName || ''
        };
    
        if (isCorrectFirstPass && firstPassword !== '' && isCorrectPassword && secondPassword !== '') {
            try {
                const response = await providerServices.newProviderLegal(data);
                console.log("Segunda pass")
                console.log(secondPassword)
                
                const loginData = {
                    phone,
                    password: secondPassword
                };
                console.log("Registrou")
                if(response !== null) {
                    await loginNextPage();
                }
                
            } catch (error) {
                console.log(error);
                if (error.response) {
                    Alert.alert("Dados errados, tente novamente");
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            }
        } else {
            Alert.alert("Por favor, verifique as senhas e tente novamente.");
        }
    }
/*    try {   
     const loginData = {
                        phone,
                        password
                    };                 
        const loginResponse = await providerServices.login(loginData);  
       console.log(loginResponse)
       //TENTAR COLOCAR EM FUNÇÕES DIFERENTES
        if(loginResponse.status === 200) {
            navigation.navigate('ListServices', loginResponse.data);
        }

    } catch (loginError) {
        console.log(loginError);
        Alert.alert("Dados errados, tente novamente");
    }*/
    
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../assets/logoCadastro.png')}
            />
            
            <Text style={styles.text}>Ainda não é cadastrado?</Text>
            <Text style={styles.text}>Crie sua conta agora mesmo!</Text>

            <View>
                <Text style={styles.textLabel}>Senha</Text>
                <TextInput
                    style={styles.input}
                    value={firstPassword}
                    onChangeText={onChangeFirstPassword}
                    maxLength={20}
                    secureTextEntry={true}
                    placeholder={"Senha"}
                    autoCapitalize="none"
                />
                {!isCorrectFirstPass && <Text style={{ color: '#EFFE0B' }}>Senha deve ter mais de 6 caracteres</Text>}
            </View>

            <View>
                <Text style={styles.textLabel}>Confirmar Senha:</Text>
                <TextInput
                    style={styles.input}
                    value={secondPassword}
                    onChangeText={onChangeSecondPassword}
                    maxLength={20}
                    secureTextEntry={true}
                    placeholder={"Confirmar Senha:"}
                    autoCapitalize="none"
                />
                {!isCorrectPassword && <Text style={{ color: '#EFFE0B' }}>Senhas divergentes</Text>}
            </View>

            <ButtonLogin 
                text={"Salvar"}  
                onPress={saveData}
            />
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
