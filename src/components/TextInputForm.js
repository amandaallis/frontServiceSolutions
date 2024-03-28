import { StyleSheet, Text, TextInput, View } from "react-native";

const onChangeText = (text) => {
    console.log(text)
}
const TextInputForm = ({label, placeholder, secureTextEntry}) => {
    return (
        <View>
            <Text style={styles.textLabel}>{label}</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => onChangeText(text)}
                maxLength={30}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#FFFF',
        width: 310,
        height: 40,
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
      },
    textLabel: {
        margin: 10,
        color:"#FFF",
    }
})
export default TextInputForm;