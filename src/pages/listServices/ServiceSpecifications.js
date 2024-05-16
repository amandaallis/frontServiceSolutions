import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Linking } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const ServiceSpecifications = ({route, navigation}) => {
    console.log("Assim que chegou o route")
    console.log(route)
    const { userName, city, phone, serviceName, description, adress } = route.params;
    console.log("Assim que está o adress")
    return (
        <View style={styles.container}>
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{serviceName}</Text>
            <View style={styles.serviceDetails}>
                <Text style={styles.serviceDetailsTitle}>Detalhes do serviço:</Text>
                <Text style={styles.cardDescription}>
                    {description}
                </Text>
            </View>

            <View style={styles.userInfo}>
                <Icon name="user" style={styles.icon}/>
                <Text style={styles.cardDescription}>{userName}</Text>
            </View>
            <View style={styles.userInfo}>
                <Icon name="map-marker" style={styles.icon}/>
                <Text style={styles.cardDescription}>{adress.street}, {adress.number}, {adress.district}, {adress.city} - {adress.cep}</Text>
            </View>
            <View style={styles.userInfo}>
                <Icon name="phone" style={styles.icon} />
                <Text style={styles.cardDescription}>{phone}</Text>
            </View>
            <View style={styles.buttons}>
            <TouchableOpacity
                style={styles.buttonAccept}
                onPress={() => navigation.navigate('SendMessage', { phone: phone })}  
            >
                <Text style={styles.buttonText}>Aceitar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonReject}
                onPress={() => console.log("Clicou")}  
            >
                <Text style={styles.buttonText}>Recusar</Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        alignContent: 'center',
        backgroundColor: "#FFFFFF",
        width: 350,
        height: 500,
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
      },
      cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        padding: 12,
        color: "#000"
      },
      serviceDetails: {
        marginBottom: 10,
      },
      serviceDetailsTitle: {
        fontSize: 16,
        fontWeight: "bold",
        paddingVertical: 8,
        color: "#000"
      },
      cardDescription: {
        fontSize: 14,
        padding: 10,
        color: "#000",
        flexWrap: "wrap", // Garante que o texto quebra de linha conforme necessário
      },
      userInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 16
      },
      cardActions: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderTopWidth: 1,
        borderTopColor: "#E0E0E0",
        paddingVertical: 12,
      },
      icon: {
        fontSize: 25,
        color: "#000"
    },
    buttonText: {
        color: "#FFFFFF",
        width: '127',
        height: '25',
        fontWeight: "bold",
        paddingLeft: 20
    },
    buttonAccept: {
        marginTop: 5,
        justifyContent: 'center',
        width: 90,
        height: 30,
        backgroundColor: "#1FAF38",
        borderRadius: 6,
        textAlign: 'center',
        margin: 10
    },
    buttonReject: {
        marginTop: 5,
        justifyContent: 'center',
        width: 90,
        height: 30,
        backgroundColor: "#FF0A0AB2",
        borderRadius: 6,
        textAlign: 'center',
        margin: 10
    },
    buttons: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    }
      
});

export default ServiceSpecifications;