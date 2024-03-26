import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Stopwatch from './StopWatch'; // Import the Stopwatch component

const DurationExercise = ({ navigation }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleReset = () => {
    console.log('Reset button clicked');
    setIsRunning(false);
    setTimer(0);
    console.log('Timer reset to zero');
  };

  return (
    <View style={styles.container}>
      <Stopwatch isRunning={isRunning} />
      <View style={styles.buttonContainer}>
        <Button
          title={isRunning ? 'Stop' : 'Start'}
          onPress={() => setIsRunning(!isRunning)}
        />
        <Button
          title="Home"
          onPress={() => navigation.navigate('Home')}
        />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    width: '100%',
  },
});

export default DurationExercise;
