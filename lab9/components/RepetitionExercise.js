import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function RepetitionExercise({ exercise, setMenuScreen }) {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{exercise.name}</Text>
      <Text style={styles.count}>{count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
      <Button title="Reset" onPress={() => setCount(0)} />
      <Button title="Back to Menu" onPress={setMenuScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  count: {
    fontSize: 50,
    marginBottom: 20,
  },
});
