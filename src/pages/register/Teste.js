import React, { useLayoutEffect, useEffect } from 'react';
import { BackHandler, Text, View } from 'react-native';

const Teste = ({ navigation }) => {
    
    useLayoutEffect(() => {
        navigation.setOptions({
            gestureEnabled: false
        });
    }, [navigation]);

    useEffect(() => {
        const backAction = () => {
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <View>
            <Text>OIII</Text>
        </View>
    );
}

export default Teste;
