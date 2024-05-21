import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import providerServices from "../../services/ProviderServices";
import ChoiceProviderByService from "./ChoiceProviderByService";
import { useNavigation } from '@react-navigation/native';

const ChoiceServices = ({ token }) => {
    const navigation = useNavigation();

    const getProvidersByServices = async (service) => {
        try {
            const providers = await providerServices.getProvidersByServices(token, service);

            const data = {
                token,
                providers,
                service,
            }

        navigation.navigate('ChoiceProviderByService', { 
          screen: 'Home', 
          params: {data: data} 
        });   
            
        } catch (error) {
            console.log(error)
        }
    } 
    
    return (
        <View style={styles.container}>
            <View style={styles.cardsContainer}>
                <TouchableOpacity  
                    style={styles.card}
                    onPress={() => getProvidersByServices("Eletricista") }
                >              
                <Image
                    style={styles.image}
                    source={require('../../assets/eletricista.png')}
                />
                    <Text style={styles.name}>Eletricista</Text>
                </TouchableOpacity>
                <TouchableOpacity  
                    style={styles.card}
                    onPress={() => getProvidersByServices("Encanador") }
                >                       
                <Image
                    style={styles.image}
                    source={require('../../assets/encanador.png')}
                />
                    <Text style={styles.name}>Encanador</Text>
                </TouchableOpacity>
                <TouchableOpacity  
                    style={styles.card}
                    onPress={() => getProvidersByServices("Serviços de limpeza") }
                >               
                <Image
                    style={styles.image}
                    source={require('../../assets/servicos_limpeza.png')}
                />
                    <Text style={styles.name}>Serviços de Limpeza</Text>
                </TouchableOpacity>
                <TouchableOpacity  
                    style={styles.card}
                    onPress={() => getProvidersByServices("Jardineiro") }
                >    
                <Image
                    style={styles.image}
                    source={require('../../assets/jardineiro.png')}
                />
                    <Text style={styles.name}>Jardineiro</Text>
                </TouchableOpacity>
                <TouchableOpacity  
                    style={styles.card}
                    onPress={() => getProvidersByServices("Montador de Móveis") }
                >                    
                <Image
                    style={styles.image}
                    source={require('../../assets/montador.png')}
                />
                    <Text style={styles.name}>Montador</Text>
                </TouchableOpacity>
                <TouchableOpacity  
                    style={styles.card}
                    onPress={() => getProvidersByServices("Pedreiro") }
                >
                <Image
                    style={styles.image}
                    source={require('../../assets/pedreiro.png')}
                    />
                    <Text style={styles.name}>Pedreiro</Text>
                </TouchableOpacity>                   
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    header: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    loginButton: {
        marginBottom: 20,
    },
    text: {
        fontSize: 15,
        color: '#2D4B73',
        marginTop: 0,
        alignItems: 'center',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    text2: {
        fontSize: 15,
        color: '#2D4B73',
        marginTop: 0,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    card: {
        backgroundColor: "#2D4B73",
        width: 160,
        height: 180,
        margin: 10,
        padding: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 130,
        height: 100,
    },
    name: {
        marginTop: 10,
        color:'#FFF',
        fontWeight: 'bold',
    },
})

export default ChoiceServices;
