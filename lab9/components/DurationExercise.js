import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Stopwatch from './StopWatch';

const DurationExercise = ({ navigation, route }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleReset = () => {
    setIsRunning(false);
    setTimer(0);
  };

  const suggestedActivity = route.params && route.params.suggested ? route.params.suggested : "Unknown";
  const activity = route.params && route.params.activity ? route.params.activity : "Unknown";
  const isSuggestedActivity = suggestedActivity === activity;

  return (
    <View style={styles.container}>
    <Text style={styles.title}>{activity}</Text>
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
        {!isSuggestedActivity && suggestedActivity !== "Unknown" && (
         <Button
            title={`Suggested: ${suggestedActivity}`}
            onPress={() => navigation.navigate(suggestedActivity, { activity: suggestedActivity })}
        />
        )}
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