/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import Login from './src/pages/login/Login';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Choice from './src/pages/choice/Choice';
import providerServices from './src/services/ProviderServices';
import ListServices from './src/pages/listServices/ListServices';
import Register from './src/pages/register/Register';
import LegalProvider from './src/pages/register/LegalProvider';
import LegalProviderDois from './src/pages/register/LegalProviderDois';
import LegalProviderTres from './src/pages/register/LegalProviderTres';
const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Choice'>
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name='ListServices' component={ListServices} options={{ headerShown: false }}/>
      <Stack.Screen name='Choice' component={Choice} options={{ headerShown: false }}/>       
      <Stack.Screen name='Cadastro' component={Register} options={{ headerShown: false }}/>
      <Stack.Screen name='LegalProvider' component={LegalProvider} options={{ headerShown: false }}/>
      <Stack.Screen name='LegalProviderDois' component={LegalProviderDois} options={{ headerShown: false }}/>
      <Stack.Screen name='LegalProviderTres' component={LegalProviderTres} options={{ headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: '#2D4B73',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
