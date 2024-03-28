import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const ButtonLogin = ({text, onPress}) => {
  return (
    <TouchableOpacity style={styles.loginButton} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#F6B203',
    padding: 10,
    width: 230,
    borderRadius: 5,
    margin: 10,
  },
  text: {
    fontFamily: 'Roboto',
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ButtonLogin;
