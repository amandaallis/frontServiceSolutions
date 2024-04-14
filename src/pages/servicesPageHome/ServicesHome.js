import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import CardService from '../../components/CardService';

const ServicesHome = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.background}>
        <CardService
          typeService={'Chapeiro'}
          local={'Campo Mourão'}
          nameClient={'Amanda'}
          number={'(44) 99101-66665'}
        />

        <CardService
          typeService={'Chapeiro'}
          local={'Campo Mourão'}
          nameClient={'Amanda'}
          number={'(44) 99101-66665'}
        />

        <CardService
          typeService={'Chapeiro'}
          local={'Campo Mourão'}
          nameClient={'Amanda'}
          number={'(44) 99101-66665'}
        />

        <CardService
          typeService={'Chapeiro'}
          local={'Campo Mourão'}
          nameClient={'Amanda'}
          number={'(44) 99101-66665'}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  background: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20, // Adiciona um padding para evitar que o último item fique muito próximo da borda inferior
  },
});

export default ServicesHome;
