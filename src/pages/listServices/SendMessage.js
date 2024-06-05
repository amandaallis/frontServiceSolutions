import { Image, StyleSheet, View, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

const SendMessage = ({route, navigation}) => {
    const {phone } = route.params;

    const onPressWhatsApp = () => {
        const phoneNumber = phone;
        const message = 'Olá, sou prestador que você encontrou através da Service Solutions. Estou entrando em contato para entender melhor o que você precisa. Como posso te ajudar?';
        const url = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
    
        Linking.openURL(url)
            .then((data) => {
                console.log('Abrindo WhatsApp...');
            })
            .catch(() => {
                console.log('Erro ao abrir WhatsApp.');
            });
    }
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={require('../../assets/logoWhats.png')}
                />
                <TouchableOpacity
                    style={styles.buttonWhats}
                    onPress={onPressWhatsApp}  
                >
                    <Text style={styles.textWhats}>Enviar Mensagem</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Acesse o link e confirme os detalhes do serviço pelo WhatsApp</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    image: {
        marginBottom: 25,
        width: 100,
        height: 100
    },
    textWhats: {
        color: "#FFFFFF",
        width: '127',
        height: '25',
        fontWeight: "bold",
        paddingLeft: 20,
        fontSize: 20
    },
    description: {
        fontSize: 14,
        padding: 10,
        color: "#000",
        flexWrap: "wrap",
    },
    buttonWhats: {
        marginTop: 5,
        justifyContent: 'center',
        width: 200,
        height: 35,
        backgroundColor: "#1FAF38",
        borderRadius: 6,
        textAlign: 'center',
        margin: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    }
})

export default SendMessage;
