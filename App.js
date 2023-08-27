import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './navigation/Navigation';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Navigation/>
  );
};

export default App;
