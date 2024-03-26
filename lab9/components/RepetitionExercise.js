import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const RepetitionExercise = ({ navigation, route }) => {
    const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  const goToHomeScreen = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>{route.params.activity}</Text>
        <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{count}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Increment" onPress={incrementCount} />
          <Button title="Reset" onPress={resetCount} />
        </View>
        <Button title="Home" onPress={goToHomeScreen} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  counterContainer: {
    alignItems: 'center',
  },
  counterText: {
    fontSize: 48,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '60%',
  },
});

export default RepetitionExercise;
