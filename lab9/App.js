// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import DurationExercise from './components/DurationExercise';
import RepetitionExercise from './components/RepetitionExercise';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Push Ups" component={RepetitionExercise} />
        <Stack.Screen name="Running" component={DurationExercise} />
        <Stack.Screen name="Planks" component={RepetitionExercise} />
        <Stack.Screen name="Swimming" component={DurationExercise} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
