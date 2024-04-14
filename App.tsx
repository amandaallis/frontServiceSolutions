import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Choice from './src/pages/choice/Choice';
import ListServices from './src/pages/listServices/ListServices';
import Register from './src/pages/register/Register';
import LegalProvider from './src/pages/register/LegalProvider';
import LegalProviderDois from './src/pages/register/LegalProviderDois';
import LegalProviderTres from './src/pages/register/LegalProviderTres';
import TypeServiceChoice from './src/pages/register/TypeServiceChoice';
import Sucess from './src/pages/register/Sucess';
import Teste from './src/pages/register/Teste';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginClient from './src/pages/loginClient/LoginClient';
import TestePage from './src/pages/servicesPageHome/TestePage';
import Login from './src/pages/loginProvider/Login';
import Icon from 'react-native-vector-icons/FontAwesome';
import ServicesHome from './src/pages/servicesPageHome/ServicesHome';
import RegisterClientPagOn from './src/pages/registerClient/RegisterClientPagOne';
import RegisterClientPageTwo from './src/pages/registerClient/RegisterClientPageTwo';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Perfil!</Text>
    </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'user' : 'user';
          }
          return <Icon name={iconName} size={25} color={focused ? "#2D4B73" : "#C8C3C2"} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 12 }
      })}
    >
      <Tab.Screen name="Home" component={ServicesHome} options={{ headerShown: false }} />
      <Tab.Screen name="Perfil" component={SettingsScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Choice'
          screenOptions={{
            animationEnabled: false,
          }}
        >
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name='ListServices' component={ListServices} options={{ headerShown: false }}/>
          <Stack.Screen name='Choice' component={Choice} options={{ headerShown: false }}/>       
          <Stack.Screen name='Cadastro' component={Register} options={{ headerShown: false }}/>
          <Stack.Screen name='LegalProvider' component={LegalProvider} options={{ headerShown: false }}/>
          <Stack.Screen name='LegalProviderDois' component={LegalProviderDois} options={{ headerShown: false }}/>
          <Stack.Screen name='LegalProviderTres' component={LegalProviderTres} options={{ headerShown: false }}/>
          <Stack.Screen name='TypeServiceChoice' component={TypeServiceChoice} options={{ headerShown: false }}/>
          <Stack.Screen name='Sucess' component={Sucess} options={{ headerShown: false, gestureEnabled: false }}/>
          <Stack.Screen name='TestePage' component={MyTabs} options={{ headerShown: false, gestureEnabled: false }}/>
          <Stack.Screen name='LoginClient' component={LoginClient} options={{ headerShown: false, gestureEnabled: false }}/>
          <Stack.Screen name='RegisterClientPagOn' component={RegisterClientPagOn} options={{ headerShown: false}}/>
          <Stack.Screen name='RegisterClientPageTwo' component={RegisterClientPageTwo} options={{ headerShown: false}}/>
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
