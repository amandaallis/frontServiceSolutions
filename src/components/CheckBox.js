import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';

const CheckBox = ({ isChecked, onToggle }) => {
    return (
        <TouchableOpacity onPress={onToggle}>
            <View style={styles.checkBoxContainer}>
                {isChecked ? (
                    <FontAwesomeIcon icon={faCheckSquare} style={styles.icon} />
                ) : (
                    <FontAwesomeIcon icon={faSquare} style={styles.icon} />
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkBoxContainer: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#1E6F9F',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 24,
        color: '#1E6F9F',
    },
});

export default CheckBox;
