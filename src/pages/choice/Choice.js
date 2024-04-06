import {Image, StyleSheet, Text, View} from 'react-native';
import ButtonLogin from '../../components/ButtonLogin';

const Choice = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/logoInicial.png')}
      />
      <ButtonLogin 
        text={'Sou cliente'}
        onPress={()=> {
          navigation.navigate('Login')
        }}
        
      />
      <ButtonLogin 
        text={'Sou Prestador'}
        onPress={() => {
          navigation.navigate('Login')
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D4B73',
  },
  image: {
    marginBottom: 50,
  },
});

export default Choice;
