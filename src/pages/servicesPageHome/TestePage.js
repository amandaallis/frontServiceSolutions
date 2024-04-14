import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import CardService from "../../components/CardService";

const TestePage = () => {
  return (
    <View style={styles.background}>
      <CardService
        typeService={"Chapeiro"} 
        local={"Campo Mourão"}
        nameClient={"Amanda"}
        number={"(44) 99101-66665"}
      />

      <CardService
        typeService={"Chapeiro"} 
        local={"Campo Mourão"}
        nameClient={"Amanda"}
        number={"(44) 99101-66665"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#FFF",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default TestePage;
