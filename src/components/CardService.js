import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const CardService = ({ text, typeService, nameClient, local, number, onPress }) => {
  let buttonColor;
  if (text === "Aceito") {
    buttonColor = "#1FAF38";
  } else if (text === "Recusado") {
    buttonColor = "#FF0A0AB2";
  } else {
    buttonColor = "#2D4B73";
  }

  const dynamicStyles = {
    button: {
      backgroundColor: buttonColor,
    },
  };

  return (
    <View style={styles.background}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{typeService}</Text>
        <View style={styles.userInfo}>
          <Icon name="user" style={styles.icon}/>
          <Text style={styles.cardDescription}>{nameClient}</Text>
        </View>
        <View style={styles.userInfo}>
          <Icon name="map-marker" style={styles.icon}/>
          <Text style={styles.cardDescription}>{local}</Text>
        </View>
        <View style={styles.userInfo}>
          <Icon name="phone" style={styles.icon} />
          <Text style={styles.cardDescription}>{number}</Text>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={[styles.button, dynamicStyles.button]}
            onPress={onPress}  
          >
            <Text style={styles.buttonText}>{text}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    width: 310,
    height: 240,
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
  cardDescription: {
    fontSize: 14,
    padding: 10,
    color: "#000"
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
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    width: '127',
    height: '25',
    fontWeight: "bold",
  },
  icon: {
    fontSize: 25,
    color: "#000"
  }
});

export default CardService;
