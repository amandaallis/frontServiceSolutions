import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, TextInput, Alert } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import ButtonLogin from "../../components/ButtonLogin";
import providerServices from "../../services/ProviderServices";

const LegalProviderDois = ({ route, navigation }) => {
    const { cnpj, razaoSocial } = route.params;

    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [isCorrectEmail, setIsCorrectEmail] = useState(true);
    const [isCorrectPhone, setIsCorrectPhone] = useState(true);
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showCityList, setShowCityList] = useState(true);

    const fetchCities = async () => {
        try {
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
            const data = await response.json();
            const cityNames = data.map(city => city.nome);
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

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    };

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

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = cities.filter(city => city.toLowerCase().includes(text.toLowerCase()));
        setFilteredCities(filtered);
        setShowCityList(true);
    };

    const selectCity = (city) => {
        setSelectedCity(city);
        setSearchText(city);
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

    const canNavigate = () => {

        if(isCorrectEmail && email !== '' && isCorrectPhone && phone !== '' && selectedCity !== '') {
            navigation.navigate('LegalProviderTres', {
                email: email,
                phone: phone,
                password: '',
                cnpj: cnpj,
                razaoSocial: razaoSocial,
                cidade: selectedCity
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

                <Text style={styles.textLabel}>Cidade: </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a cidade"
                    onChangeText={handleSearch}
                    value={searchText}
                    onFocus={() => setShowCityList(true)} // Mostrar a lista quando o input é focado
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

export default LegalProviderDois;
