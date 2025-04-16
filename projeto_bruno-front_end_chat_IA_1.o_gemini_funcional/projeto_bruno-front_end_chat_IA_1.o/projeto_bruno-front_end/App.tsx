// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import CarrinhoScreen from './screens/CarrinhoScreen';
import FAQScreen from './screens/FAQScreen';  
import ChatScreen from './screens/ChatScreen';  // Importando a tela ChatScreen

import { CarrinhoProvider } from './screens/CarrinhoContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <CarrinhoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
          />
          <Stack.Screen 
            name="Carrinho" 
            component={CarrinhoScreen} 
          />
          <Stack.Screen 
            name="FAQ" 
            component={FAQScreen}  
          />
          <Stack.Screen 
            name="Chat" 
            component={ChatScreen}  // Adicionando a tela Chat
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CarrinhoProvider>
  );
};

export default App;
