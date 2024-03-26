import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DurationExercise from './components/DurationExercise';
import RepetitionExercise from './components/RepetitionExercise';
import RunningExercise from './components/RunningExercise';

const MENU_SCREEN = "menu";
const EXERCISE_SCREEN = "exercise";
const DURATION_EXERCISE = "duration";
const REPETITION_EXERCISE = "repetition";
const RUNNING_EXERCISE = "running";

const exerciseList = [
  { type: DURATION_EXERCISE, name: "Rowing" },
  { type: DURATION_EXERCISE, name: "Swimming" },
  { type: REPETITION_EXERCISE, name: "Push Ups" },
  { type: RUNNING_EXERCISE, name: "Running" }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(MENU_SCREEN);
  const [currentExercise, setCurrentExercise] = useState(exerciseList[0]);

  const handleButtonClick = (exercise) => {
    setCurrentExercise(exercise);
    setCurrentScreen(EXERCISE_SCREEN);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case MENU_SCREEN:
        return (
          <View style={styles.container}>
            <Text style={styles.heading}>Exercise Menu</Text>
            {exerciseList.map((exercise, index) => (
              <Button key={index} title={exercise.name} onPress={() => handleButtonClick(exercise)} />
            ))}
          </View>
        );
      case EXERCISE_SCREEN:
        switch (currentExercise.type) {
          case DURATION_EXERCISE:
            return <DurationExercise exercise={currentExercise} setMenuScreen={() => setCurrentScreen(MENU_SCREEN)} />;
          case REPETITION_EXERCISE:
            return <RepetitionExercise exercise={currentExercise} setMenuScreen={() => setCurrentScreen(MENU_SCREEN)} />;
          case RUNNING_EXERCISE:
            return <RunningExercise exercise={currentExercise} setMenuScreen={() => setCurrentScreen(MENU_SCREEN)} />;
          default:
            return null;
        }
      default:
        return null;
    }
  };

  return renderScreen();
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
});
