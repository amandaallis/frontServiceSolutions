import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { ActivityIndicator, TextInput } from 'react-native-paper';
import ButtonLogin from "../../components/ButtonLogin";
import providerServices from "../../services/ProviderServices";

const LegalProvider = ({ route, navigation }) => {
    const { email, phone, password, cnpj, razaoSocial, cidade } = route.params;

    const [firstPassword, setFirstPassword] = useState('');
    const [isCorrectFirstPass, setIsCorrectFirstPass] = useState(false);
    const [secondPassword, setSecondPassword] = useState('');
    const [isCorrectPassword, setIsCorrectPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hidePass1, setHidePass1] = useState(true);
    const [hidePass2, setHidePass2] = useState(true);

    const onChangeFirstPassword = (value) => {
        setFirstPassword(value);
        setIsCorrectFirstPass(value.length > 6);
    }

    const onChangeSecondPassword = (value) => {
        setSecondPassword(value);
        setIsCorrectPassword(value === firstPassword);
    }

    const togglePasswordVisibility01 = () => {
        setHidePass1(!hidePass1);
    }

    const togglePasswordVisibility02 = () => {
        setHidePass2(!hidePass2);
    }

    const loginNextPage = async () => {
        setIsLoading(true);
       
        try {
            const loginData = {
                phone: phone,
                password: secondPassword
            };
           
            const loginResponse = await providerServices.login(loginData);  

            if (loginResponse.status === 200) {
                navigation.navigate('TypeServiceChoice', loginResponse.data);
            }
        } catch (loginError) {
            console.log(loginError.message);
            Alert.alert("Dados errados, tente novamente");
        } finally {
            setIsLoading(false);
        }
    }

    const saveData = async () => {
        setIsLoading(true);
        const data = {
            email: email,
            phone: phone,
            password: secondPassword,
            cnpj: cnpj,
            companyName: razaoSocial,
            city: cidade
        };
    
        if (isCorrectFirstPass && firstPassword !== '' && isCorrectPassword && secondPassword !== '') {
            try {
                const response = await providerServices.newProviderLegal(data);
                
                if (response !== null) {
                    await loginNextPage();
                }
                
            } catch (error) {
                console.log(error.message);
                if (error.response) {
                    Alert.alert("Dados errados, tente novamente");
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            } finally {
                setIsLoading(false);
            }
        } else {
            Alert.alert("Por favor, verifique as senhas e tente novamente.");
            setIsLoading(false);
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
                <Text style={styles.textLabel}>Senha</Text>
                <TextInput
                    style={styles.input}
                    value={firstPassword}
                    onChangeText={onChangeFirstPassword}
                    maxLength={20}
                    secureTextEntry={hidePass1}
                    placeholder={"Senha"}
                    autoCapitalize="none"
                    right={
                        <TextInput.Icon icon="eye" onPress={togglePasswordVisibility01} />
                    }
                    outlineColor='#FFF'
                    activeUnderlineColor='transparent'
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
                    secureTextEntry={hidePass2}
                    placeholder={"Confirmar Senha:"}
                    autoCapitalize="none"
                    right={
                        <TextInput.Icon icon="eye" onPress={togglePasswordVisibility02} />
                    }
                    outlineColor='#FFF'
                    activeUnderlineColor='transparent'
                />
                {!isCorrectPassword && <Text style={{ color: '#EFFE0B' }}>Senhas divergentes</Text>}
            </View>

            <ButtonLogin 
                text={"Salvar"}  
                onPress={saveData}
            />
            {isLoading && <ActivityIndicator size="large" color="#FFFFFF" style={{ marginTop: 20 }} />}
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
