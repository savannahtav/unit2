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

  const suggestedActivity = route.params && route.params.suggested ? route.params.suggested : "Unknown";
  const activity = route.params && route.params.activity ? route.params.activity : "Unknown"; // Ensure activity is defined
  const isSuggestedActivity = suggestedActivity === activity;


  return (
    <View style={styles.container}>
    <Text style={styles.title}>{route.params && route.params.activity ? route.params.activity : "Unknown"}</Text>
        <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{count}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Increment" onPress={incrementCount} />
          <Button title="Reset" onPress={resetCount} />
          {suggestedActivity !== route.params.activity && ( // Only show the suggested button if it's not the current activity
          <Button
          title={`Suggested: ${suggestedActivity}`}
          onPress={() => navigation.navigate(suggestedActivity, { activity: suggestedActivity })}
          />
         )}
        </View>
        <Button title="Home" onPress={() => navigation.navigate('Home')} />
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
