import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Lógica de logout aqui, como limpar os dados de autenticação, etc.
    // Redirecione para a tela de login, ou qualquer outra tela apropriada após o logout.
    navigation.navigate("Login"); // Supondo que a tela de login seja chamada "Login"
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10, // Ajuste o espaçamento conforme necessário
  },
});

export default SettingsScreen;
