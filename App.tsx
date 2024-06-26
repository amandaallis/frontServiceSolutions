import React, { useEffect } from 'react';
import {
  BackHandler,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Choice from './src/pages/choice/Choice';
import Register from './src/pages/register/Register';
import LegalProvider from './src/pages/register/LegalProvider';
import LegalProviderDois from './src/pages/register/LegalProviderDois';
import LegalProviderTres from './src/pages/register/LegalProviderTres';
import TypeServiceChoice from './src/pages/register/TypeServiceChoice';
import Sucess from './src/pages/register/Sucess';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginClient from './src/pages/loginClient/LoginClient';
import Login from './src/pages/loginProvider/Login';
import Icon from 'react-native-vector-icons/FontAwesome';
import ServicesHome from './src/pages/servicesPageHome/ServicesHome';
import RegisterClientPagOn from './src/pages/registerClient/RegisterClientPagOne';
import RegisterClientPageTwo from './src/pages/registerClient/RegisterClientPageTwo';
import RegisterPersonalOne from './src/pages/registerPersonalProvider/RegisterPersonalOne';
import RegisterPersonTwo from './src/pages/registerPersonalProvider/RegisterPersonTwo';
import ChoiceServices from './src/pages/choiceServices/ChoiceServices';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ChoiceProviderByService from './src/pages/choiceServices/ChoiceProviderByService';
import NewService from './src/pages/choiceServices/NewService';
import SucessService from './src/pages/choiceServices/SucessService';
import ListServicesProvider from './src/pages/listServices/ListServicesProvider';
import ServiceSpecifications from './src/pages/listServices/ServiceSpecifications';
import SendMessage from './src/pages/listServices/SendMessage';
import SucessListServices from './src/pages/listServices/SucessListServices';
import SucessProvider from './src/pages/registerPersonalProvider/SucessProvider';
import ListStatusSolicitationsProvider from './src/pages/listStatusSolicitations/ListStatusSolicitationsProvider';
import SettingsScreen from './src/pages/SettingsScreen';
import Rejected from './src/pages/listServices/Rejected';
import StatusSolicitationsVerify from './src/pages/listStatusSolicitations/StatusSolicitationsVerify';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = ({route}) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const { token } = route.params.params

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused || routeName === 'NewService' || routeName === 'ChoiceProviderByService'  ? 'home' : 'home';
            return <Icon name={iconName} size={25} color={focused || routeName === 'NewService' || routeName === 'ChoiceProviderByService' ? "#2D4B73" : "#C8C3C2"} />;
          } else if (route.name === 'Status das Solicitações') {
            iconName = focused ? 'list' : 'list';
            return <Icon name={iconName} size={25} color={focused|| routeName === 'StatusSolicitationsVerify' ? "#2D4B73" : "#C8C3C2"} />;
          } /*else if(route.name === 'Histórico de serviços') {
            iconName = focused? 'history' : 'history';
          }*/
          return <Icon name={iconName} size={25} color={focused ? "#2D4B73" : "#C8C3C2"} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 12 }
      })}
    >
      <Tab.Screen name="Home" component={ServicesHome} options={{ headerShown: true }} />
      <Tab.Screen name="Status das Solicitações" component={StatusSolicitationsVerify} options={{ headerShown: true }}  initialParams={{ token }}/>
      <Tab.Screen name='ChoiceProviderByService' component={ChoiceProviderByService} options={{ headerShown: false, tabBarButton: () => null}}/>
      <Tab.Screen name="NewService" component={NewService} options={{ tabBarButton: () => null, headerShown: false }} />
      <Tab.Screen name="ServiceSpecifications" component={ServiceSpecifications} options={{ tabBarButton: () => null, headerShown: false }} />
      <Tab.Screen name="SendMessage" component={SendMessage} options={{ tabBarButton: () => null, headerShown: false }} />
    </Tab.Navigator>
  );
};


function App(): React.JSX.Element {
 /* useEffect(() => {
    const backAction = () => {
      return true; // Impede a navegação de voltar
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);*/

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
          <Stack.Screen name='Choice' component={Choice} options={{ headerShown: false }}/>       
          <Stack.Screen name='Cadastro' component={Register} options={{ headerShown: false }}/>
          <Stack.Screen name='LegalProvider' component={LegalProvider} options={{ headerShown: false }}/>
          <Stack.Screen name='LegalProviderDois' component={LegalProviderDois} options={{ headerShown: false }}/>
          <Stack.Screen name='LegalProviderTres' component={LegalProviderTres} options={{ headerShown: false }}/>
          <Stack.Screen name='TypeServiceChoice' component={TypeServiceChoice} options={{ headerShown: false }}/>
          <Stack.Screen name='Sucess' component={Sucess} options={{ headerShown: false, gestureEnabled: false }}/>
          <Stack.Screen name='ServicesHome' component={MyTabs} options={{ headerShown: false, gestureEnabled: false, headerLeft: null }}/>
          <Stack.Screen name='LoginClient' component={LoginClient} options={{ headerShown: false, gestureEnabled: false }}/>
          <Stack.Screen name='RegisterClientPagOn' component={RegisterClientPagOn} options={{ headerShown: false}}/>
          <Stack.Screen name='RegisterClientPageTwo' component={RegisterClientPageTwo} options={{ headerShown: false}}/>
          <Stack.Screen name='RegisterPersonalOne' component={RegisterPersonalOne} options={{ headerShown: false}}/>
          <Stack.Screen name='RegisterPersonTwo' component={RegisterPersonTwo} options={{ headerShown: false}}/>
          <Stack.Screen name='ChoiceServices' component={ChoiceServices} options={{ headerShown: false}}/>
          <Stack.Screen name='ChoiceProviderByService' component={MyTabs} options={{ headerShown: false}}/>
          <Stack.Screen name='NewService' component={NewService} options={{ headerShown: false }}/>
          <Stack.Screen name='SucessService' component={SucessService} options={{ headerShown: false }}/>
          <Stack.Screen name='Rejected' component={Rejected} options={{ headerShown: false }}/>
          <Stack.Screen name='ListServicesProvider' component={ListServicesProvider} options={{ headerShown: false }}/>
          <Stack.Screen name='SucessListServices' component={SucessListServices} options={{ headerShown: false }}/>
          <Stack.Screen name='SucessProvider' component={SucessProvider} options={{ headerShown: false }}/>
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
  container: { width: '100%', height: '100%', backgroundColor: '#fff' },
  tabBar: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
  },
});

export default App;
