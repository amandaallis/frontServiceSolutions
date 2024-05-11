import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Modal, StyleSheet, Text, View, BackHandler } from "react-native";
import LottieView from  "lottie-react-native";

const Sucess = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(true);

    useLayoutEffect(() => {
        navigation.setOptions({
            gestureEnabled: false
        });

        const backAction = () => {
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => {
            clearTimeout(timer);
            backHandler.remove();
        };

    }, [navigation]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setModalVisible(false);
            navigation.navigate('ListServicesProvider');
        }, 4000);

        return () => clearTimeout(timer);

    }, [navigation]);

    return (
        <View style={{ alignItems: 'center' }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <LottieView
                        source={require("../../assets/sucess.json")}
                        style={{ width: '100%', height: '50%'}}
                        autoPlay
                        speed={0.5}
                    />
                    <Text style={styles.text}> Sua conta foi criada com sucesso!</Text>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }
});

export default Sucess;
