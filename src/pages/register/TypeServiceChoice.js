import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import providerServices from "../../services/ProviderServices";

const TypeServiceChoice = () => {
    const renderServices = async () => {
        const response = await providerServices.listServices(token);
    }
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../assets/logoCadastro.png')}
            />
            <Text style={styles.title}>Estamos quase lá!</Text>
            <Text style={styles.title}>Agora informe os tipos de serviços que você trabalha</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    console.log('oi')
                }}>
                <Text style={styles.text}>Próximo</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffff',
    },
    image: {
        marginBottom: 10,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#3D3D4C',
    },
    button: {
        backgroundColor: '#2D4B73',
        padding: 10,
        width: 180,
        borderRadius: 5,
        margin: 10,
      },
      text: {
        fontFamily: 'Roboto',
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
      },
})

export default TypeServiceChoice;