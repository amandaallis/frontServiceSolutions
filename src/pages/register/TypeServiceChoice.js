import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import providerServices from "../../services/ProviderServices";
import CheckBox from '@react-native-community/checkbox';
import Sucess from "./Sucess";

const TypeServiceChoice = ({ route, navigation }) => {
    const [services, setServices] = useState([]);
    const [servicesChecked, setServicesChecked] = useState({});
    const {token } = route.params;


    const fetchServices = async () => {
        try {
            const response = await providerServices.listServices(token);
            setServices(response);
            const initialCheckedState = {};
            response.forEach(item => {
                initialCheckedState[item.id] = false;
            });
            setServicesChecked(initialCheckedState);
        } catch (error) {
            console.error("Erro ao buscar serviços:", error.message);
        }
    };
    const transformCheckedState = (checkedState) => {
        const transformedArray = [];
    
        Object.keys(checkedState).forEach(key => {
            if(servicesChecked[key] == true) {
                checkedState[key] = "ON"
            }
            else if(servicesChecked[key] == false) {
                checkedState[key] = "OFF"
            }
    
            transformedArray.push({
                serviceListId: parseInt(key), 
                status: checkedState[key]
            });
        });

        saveData(transformedArray);
    };

    const saveData = async (data) => {
        try {
            const response = await providerServices.newTypeService(data, token);
            navigation.navigate('Sucess')
        } catch (error) {
            console.log(error)
        }
    }

    const renderItem = ({ item }) => {
        const handleToggle = () => {
            setServicesChecked(prevState => ({
                ...prevState,
                [item.id]: !prevState[item.id]
            }));
        };

        return (
            <View style={styles.itens}>
                <CheckBox 
                    value={servicesChecked[item.id] || false}
                    onValueChange={handleToggle}
                />
                <Text style={styles.textType}>{item.service}</Text>
            </View>
        );
    };

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../assets/logoCadastro.png')}
            />
            <Text style={styles.title}>Estamos quase lá!</Text>
            <Text style={styles.titleDois}>Agora informe os tipos de serviços que você trabalha</Text>
            <FlatList
                data={services}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    const transformedChecked = transformCheckedState(servicesChecked);
                }}>
                <Text style={styles.text}>Concluir</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffff',
    },
    image: {
        marginTop: 50,
        marginBottom: 10,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#3D3D4C',
    },
    titleDois: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#3D3D4C',
        marginBottom: 50
    },
    button: {
        backgroundColor: '#2D4B73',
        padding: 10,
        width: 180,
        borderRadius: 5,
        margin: 80,
    },
    text: {
        fontFamily: 'Roboto',
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    textType: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3D3D4C',
    },
    itens: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    }
});


export default TypeServiceChoice;
