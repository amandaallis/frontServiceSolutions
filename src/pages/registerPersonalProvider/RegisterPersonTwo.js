import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import ButtonLogin from '../../components/ButtonLogin';
import providerClient from '../../services/ProviderClient';
import { FlatList } from 'react-native-gesture-handler';
import providerServices from '../../services/ProviderServices';

const RegisterPersonTwo = ({ route, navigation }) => {
    const { name, email, phone, cpf } = route.params;

    const [hidePass1, setHidePass1] = useState(true);
    const [hidePass2, setHidePass2] = useState(true);
    const [firstPassword, setFirstPassword] = useState('');
    const [isCorrectFirstPass, setIsCorrectFirstPass] = useState(false);
    const [secondPassword, setSecondPassword] = useState('');
    const [isCorrectPassword, setIsCorrectPassword] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showCityList, setShowCityList] = useState(true);

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

    useEffect(() => {
        fetchCities();
    }, []);

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = cities.filter(city => city.toLowerCase().includes(text.toLowerCase()));
        setFilteredCities(filtered);
        setShowCityList(true);
    };

    const selectCity = (city) => {
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
                        
            const loginResponse = await providerServices.login(loginData);  

            if (loginResponse.status === 200) {
                navigation.navigate('TypeServiceChoice', loginResponse.data );
            }
        } catch (loginError) {
            console.log(loginError);
            Alert.alert("Dados errados, tente novamente");
        } finally {
            setIsLoading(false);
        }
    }

    const saveData = async () => {
        setIsLoading(true);
        const data = {
            email: email,
            name,
            phone: phone,
            password: secondPassword,
            city: selectedCity,
            cpf
        };
            
        if (isCorrectFirstPass && firstPassword !== '' && isCorrectPassword && secondPassword !== '') {
            try {
                const response = await providerServices.newProviderPersonal(data);

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
            <Text style={styles.textLabel}>Cidade: </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a cidade"
                    onChangeText={handleSearch}
                    value={searchText}
                    onFocus={() => setShowCityList(true)}
                />
                <View style={styles.cityList}>
                    {isLoading ? (
                        <Text>Carregando cidades...</Text>
                    ) : showCityList ? (
                        <FlatList
                            data={filteredCities}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            style={styles.cityFlatList}
                        />
                    ) : (
                        <Text>{selectedCity}</Text>
                    )}
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
    },
    input: {
        backgroundColor: '#FFFF',
        width: 310,
        height: 40,
        borderColor: '#FFF',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    textLabel: {
        margin: 10,
        color: "#FFF",
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
})

export default RegisterPersonTwo;
