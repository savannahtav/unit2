import React from 'react';
import { View, FlatList, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const exercises = [
  { name: 'Duration Exercise', screen: 'DurationExercise' },
  { name: 'Repetition Exercise', screen: 'RepetitionExercise' },
  // Add more exercise types as needed
];

const Home = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <Button
      title={item.name}
      onPress={() => navigation.navigate(item.screen)}
    />
  );

  return (
    <View>
      <FlatList
        data={exercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default Home;