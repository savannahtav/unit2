import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import StopWatch from './StopWatch';

const DurationExercise = ({ exercise, setMenuScreen }) => {
  const { name } = exercise;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <StopWatch />
      <Button title="Back to Menu" onPress={() => setMenuScreen(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default DurationExercise;
