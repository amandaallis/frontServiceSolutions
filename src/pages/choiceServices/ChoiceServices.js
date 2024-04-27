import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import CardService from "../../components/CardService";
import { TouchableOpacity } from "react-native-gesture-handler";

const ChoiceServices = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.text}>Serviços</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.text2}>Status{"\n"}das solicitações</Text>
                </TouchableOpacity>   
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.text2}>Status{"\n"}das solicitações</Text>
                </TouchableOpacity>          
            </View>
            <View style={styles.cardsContainer}>
                <View style={styles.card}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/eletricista.png')}
                    />
                    <Text style={styles.name}>Eletricista</Text>
                </View>
                <View style={styles.card}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/encanador.png')}
                    />
                    <Text style={styles.name}>Encanador</Text>
                </View>
                <View style={styles.card}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/servicos_limpeza.png')}
                    />
                    <Text style={styles.name}>Serviços de Limpeza</Text>
                </View>
                <View style={styles.card}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/jardineiro.png')}
                    />
                    <Text style={styles.name}>Jardineiro</Text>
                </View>
                <View style={styles.card}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/montador.png')}
                    />
                    <Text style={styles.name}>Montador</Text>
                </View>
                <View style={styles.card}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/pedreiro.png')}
                    />
                    <Text style={styles.name}>Pedreiro</Text>
                </View>
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
        textAlign: 'center', // Alinha o texto ao centro
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around', // Espaçamento entre os cards
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
