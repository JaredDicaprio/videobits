/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import 'react-native-get-random-values'

import React from 'react';
import {
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  Home,
  Picker,
  Get,
  VideoTrimmed,
  TrimOptions,
  Compress,
  PlayWorks,
  Settings,
  Languages,
  Aboutus
} from './src/screens/index';
import {
  HomeHeader
} from './src/components';
import { GloabalProvider } from './src/Context/index';
import { LoginContext } from './src/Context/LoginProvider'
import I18n from "i18n-js";


const Stack = createStackNavigator();

const App: () => React$Node = () => {


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <GloabalProvider value="">
        <NavigationContainer>
          <Stack.Navigator>

            <Stack.Screen name="Main" component={Main}
              options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </GloabalProvider>
    </>
  );
};

function Main() {
  const { user, login } = React.useContext(LoginContext);
  const [isLogin, setIsLogin] = login
  return (
    <Stack.Navigator>
      {isLogin == false ? <>
        <Stack.Screen name="Get" component={Get}
          options={{ headerShown: false }} />
      </> :
        <>
          <Stack.Screen name="Home" component={Home}
            options={{ headerTitle: props => <HomeHeader {...props} /> }}
          />
          <Stack.Screen name="TrimeOptions"
            options={{
              headerStyle: {
                backgroundColor: 'white',
              },
              headerTitle: I18n.t("optionsStatus"),
            }}
            component={TrimOptions} />
          <Stack.Screen name="Picker"
            options={{
              headerTitle: I18n.t("trim"),
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}
            component={Picker} />
          <Stack.Screen name="VideoTrimmed"
            options={{
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}
            component={VideoTrimmed} />
          <Stack.Screen name="compress"
            options={{
              headerTitle: I18n.t("reducer"),
              headerStyle: {
                backgroundColor: '#9f5ae3',
              },
            }}
            component={Compress} />
          <Stack.Screen name="PlayWorks"
            options={{ headerShown: false }}
            component={PlayWorks} />
          <Stack.Screen name="Languages"
            options={{
              headerTitle: I18n.t("languageBtnTitle"),
            }}
            component={Languages} />

          <Stack.Screen name="Aboutus"
            options={{
              headerTitle: I18n.t("about"),
            }}
            component={Aboutus} />

          <Stack.Screen name="Settings"
            options={{
              headerTitle: I18n.t("settings"),
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              }
            }}
            component={Settings} />
        </>
      }
    </Stack.Navigator>
  )
}

export default App;
