import React, { useLayoutEffect, useEffect } from 'react';
import { BackHandler, Text, View } from 'react-native';

const Teste = ({ navigation }) => {
    
    useLayoutEffect(() => {
        navigation.setOptions({
            gestureEnabled: false // Desabilita o gesto de voltar
        });
    }, [navigation]);

    useEffect(() => {
        const backAction = () => {
            // Não faz nada ao pressionar o botão de voltar
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove(); // Remove o listener ao desfocar a tela
    }, []);

    return (
        <View>
            <Text>OIII</Text>
        </View>
    );
}

export default Teste;
