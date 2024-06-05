import React, { useEffect, useState } from 'react';
import { Alert, Image, SectionList, StyleSheet, Text, View, TextInput as TextInput2 } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import ButtonLogin from '../../components/ButtonLogin';
import providerClient from '../../services/ProviderClient';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RegisterClientPageTwo = ({ route, navigation }) => {
    const { name, email, phone } = route.params;

    const [hidePass1, setHidePass1] = useState(true);
    const [hidePass2, setHidePass2] = useState(true);
    const [firstPassword, setFirstPassword] = useState('');
    const [isCorrectFirstPass, setIsCorrectFirstPass] = useState(false);
    const [secondPassword, setSecondPassword] = useState('');
    const [isCorrectPassword, setIsCorrectPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isCorrectCity, setIsCorrectCity] = useState(false);
    const [cities, setCities] = useState([]);
    const [showCityList, setShowCityList] = useState(true);
    const [selectedCity, setSelectedCity] = useState('');
    const [searchText, setSearchText] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);


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
        try {
            const loginData = {
                phone: phone,
                password: secondPassword
            };
                        
            const loginResponse = await providerClient.login(loginData);  

            if (loginResponse.status === 200) {
                navigation.navigate('Sucess', { data: loginResponse.data });
            }
        } catch (loginError) {
            console.log(loginError);
            Alert.alert("Dados errados, tente novamente");
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
            const data = await response.json();
            const cityNames = data.map(city => `${city.nome} - ${city.microrregiao.mesorregiao.UF.sigla}`);
            setCities(cityNames);
            setFilteredCities(cityNames);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching cities:', error);
            setIsLoading(false);
        }
    };

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = cities.filter(city => city.toLowerCase().includes(text.toLowerCase()));
        setFilteredCities(filtered);
        setShowCityList(true);
    };

    const selectCity = (city) => {
        setIsCorrectCity(true);
        setSelectedCity(city);
        setSearchText(city.split(' - ')[0]);
        setShowCityList(false);
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.cityItem}
                onPress={() => selectCity(item)}
            >
                <Text>{item}</Text>
            </TouchableOpacity>
        );
    };

    const saveData = async () => {
        setIsLoading(true);
        const data = {
            email: email,
            name,
            phone: phone,
            password: secondPassword,
            city: selectedCity
        };
    
        if (isCorrectFirstPass && firstPassword !== '' && isCorrectPassword && secondPassword !== '' && selectedCity !== '') {
            try {
                const response = await providerClient.newRequester(data);
                
                if (response !== null) {
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
                    placeholder={"Digite sua senha:"}
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

            <View style={styles.inputContainer}>
                <Text style={styles.textLabel}>Cidade{!isCorrectCity && <Text style={{ color: '#b80b0b' }}>*</Text>}</Text>
                <View style={styles.cityList}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite a cidade"
                        onChangeText={handleSearch}
                        value={searchText}
                        onFocus={() => setShowCityList(true)}
                    />
                    {isLoading ? (
                        <Text>Carregando cidades...</Text>
                    ) : showCityList ? (
                        <SectionList
                            sections={[{ title: 'Cidades', data: filteredCities }]}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            style={styles.cityFlatList}
                        />
                    ) : null}
                </View>
            </View>

            <ButtonLogin text="Próximo" onPress={saveData} />
            {isLoading ? <ActivityIndicator size="large" color="#FFFFFF"/> : null}
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
        textAlign: 'center',
        marginBottom: 20,
    },
    textLabel: {
        margin: 10,
        color:"#FFF",
    },
    input: {
        backgroundColor: '#FFFFFF',
        width: 310,
        height: 40,
        borderColor: '#FFF',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    cityItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    inputContainer: {
        marginBottom: 20,
    },
    cityList: {
        backgroundColor: '#FFFFFF',
        width: 310,
        maxHeight: 200,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    cityFlatList: {
        flexGrow: 0,
    },
});

export default RegisterClientPageTwo;
