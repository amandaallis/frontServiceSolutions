import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CustomButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#F6B203',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      <Text style={{ color: 'black', fontSize: 16 }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
