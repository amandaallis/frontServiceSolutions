import React, { useEffect, useState } from "react";
import { Alert, SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";
import providerClient from "../../services/ProviderClient";

const NewService = ({ navigation, route }) => {
    const { providers, token, item } = route.params;
    const { serviceListItem } = providers[0]; 
    const [rua, setRua] = useState('');
    const [isCorrectRua, setisCorrectRua] = useState(false);
    const [numero, setNumero] = useState('');
    const [isCorrectNumero, setIsCorrectNumero] = useState(false);
    const [bairro, setBairro] = useState('');
    const [isCorrectBairro, setIsCorrectBairro] = useState(false);
    const [cep, setCep] = useState('');
    const [isCorrectCep, setIsCorrectCep] = useState(false);
    const [filteredCities, setFilteredCities] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [cities, setCities] = useState([]);
    const [showCityList, setShowCityList] = useState(true);
    const [selectedCity, setSelectedCity] = useState('');
    const [serviceDetails, setServiceDetails] = useState('');
    const [isCorrectCity, setIsCorrectCity] = useState(false);

    const onChangeRua = (value) => {   
        setRua(value);
        setisCorrectRua(value.length > 5);
    };

    const onChangeNumero = (value) => {   
        setNumero(value);
        setIsCorrectNumero(value.length > 1);
    };

    const onChangeBairro = (value) => {   
        setBairro(value);
        setIsCorrectBairro(value.length > 5);
    };

    const onChangeCep = (value) => {   
        setCep(value);
        setIsCorrectCep(value.length === 9);
    };

    const newService = async () => {
        if (isCorrectRua && isCorrectNumero && isCorrectBairro && isCorrectCep && isCorrectCity && serviceDetails) {
            try {
                const data = {
                    typeServiceId: serviceListItem,
                    providerId: item.providerId,
                    description: serviceDetails,
                    street: rua,
                    number: Number(numero),
                    district: bairro,
                    city: selectedCity,
                    cep: cep
                };

                const response = await providerClient.newService(data, token);

                if (response.status === 200) {
                    navigation.navigate('SucessService', { data: token });
                }
            } catch (error) {
                Alert.alert("Erro ao solicitar serviço. Verifique os dados e tente novamente.");
                console.log(error.response.data);
                console.log(error);
            }
        } else {
            Alert.alert("Todos os campos são obrigatórios. Por favor, preencha todos os campos corretamente.");
        }
    };

    useEffect(() => {
        fetchCities();
        setRua('');
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setRua('');
            setNumero('');
            setBairro('');
            setCep('');
            setSearchText('');
            setShowCityList(true);
            setSelectedCity('');
            setServiceDetails('');
            setisCorrectRua(false);
            setIsCorrectNumero(false);
            setIsCorrectBairro(false);
            setIsCorrectCep(false);
            setIsCorrectCity(false);

            fetchCities();
        });

        return unsubscribe;
    }, [navigation]);

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

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Preencha as informações para contratar um serviço</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.letters}>Detalhes do Serviço: {!serviceDetails && <Text style={{ color: '#b80b0b' }}>*</Text>}</Text>
                <TextInput
                    style={styles.bigInput}
                    placeholder="Digite aqui os detalhes para prestação de serviços"
                    maxLength={200}
                    value={serviceDetails}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => setServiceDetails(text)}
                />
            </View>
            <Text style={styles.letters}>Endereço para prestação de serviço: </Text>
            <View style={styles.firstPart}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Rua{!isCorrectRua && <Text style={{ color: '#b80b0b' }}>*</Text>}</Text> 
                    <TextInput
                        style={styles.input}
                        placeholder="Rua"
                        maxLength={30}
                        value={rua}
                        onChangeText={onChangeRua}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Número{!isCorrectNumero && <Text style={{ color: '#b80b0b' }}>*</Text>}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Número"
                        keyboardType="numeric"
                        maxLength={10}
                        value={numero}
                        onChangeText={onChangeNumero}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Bairro{!isCorrectBairro && <Text style={{ color: '#b80b0b' }}>*</Text>}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Bairro"
                        maxLength={30}
                        value={bairro}
                        onChangeText={onChangeBairro}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>CEP{!isCorrectCep && <Text style={{ color: '#b80b0b' }}>*</Text>}</Text>
                    <TextInputMask
                        style={styles.input}
                        placeholder="CEP"
                        type={"custom"}
                        options={{
                            mask: "99999-999"
                        }}
                        value={cep}
                        keyboardType="numeric"
                        onChangeText={onChangeCep}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Cidade{!isCorrectCity && <Text style={{ color: '#b80b0b' }}>*</Text>}</Text>
                    <View style={styles.cityList}>
                        <TextInput
                            style={styles.input2}
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={newService}>
                    <Text style={styles.textButton}>Solicitar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    button: {
        backgroundColor: '#2D4B73',
        textAlign: 'center',
        margin: 10,
        borderRadius: 20
    },
    textButton: {
        color: '#FFFFFF',
        width: 130,
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
    },
    title: {
        textAlign: 'center',
        marginVertical: 10,
        color: '#4C4C4C',
        fontSize: 22,
        fontWeight: '500',
        marginBottom: 50,
    },
    letters: {
        color: '#4C4C4C',
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        color: '#4C4C4C',
        fontSize: 15,
        marginBottom: 5,
    },
    bigInput: {
        backgroundColor: "#F5F5F5",
        width: 333,
        minHeight: 100,
        borderColor: "black",
        borderWidth: 1,
        fontWeight: "500",
        borderRadius: 9,
        color: "#4C4C4C",
        fontSize: 15,
        paddingHorizontal: 10,
        paddingTop: 10,
        marginBottom: 10,
    },
    input: {
        backgroundColor: "#F5F5F5",
        width: 333,
        height: 40,
        borderColor: "black",
        borderWidth: 1,
        fontWeight: "500",
        borderRadius: 9,
        color: "#4C4C4C",
        fontSize: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    input2: {
        backgroundColor: "#F5F5F5",
        width: 333,
        height: 40,
        borderColor: "black",
        borderWidth: 1,
        fontWeight: "500",
        borderRadius: 9,
        color: "#4C4C4C",
        fontSize: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
        marginLeft: -10,
    },
    firstPart: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 20,
    },
    cityList: {
        backgroundColor: '#FFFF',
        width: 333,
        maxHeight: 200,
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    textInputCity: {
        backgroundColor: "#F5F5F5",
        width: '100%',
        height: 40,
        borderColor: "black",
        borderWidth: 1,
        fontWeight: "500",
        borderRadius: 9,
        color: "#4C4C4C",
        fontSize: 15,
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

export default NewService;
