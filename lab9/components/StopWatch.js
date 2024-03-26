import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Stopwatch = ({ isRunning }) => {
  const [timer, setTimer] = useState(0);
  const [resetOnStop, setResetOnStop] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 10);
      }, 10);
    } else {
      clearInterval(interval);
      if (resetOnStop) {
        setTimer(0);
        setResetOnStop(false);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, resetOnStop]);

  const formatTime = (time) => {
    const milliseconds = Math.floor(time % 1000).toString().padStart(3, '0');
    const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor((time / (1000 * 60)) % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  const handleReset = () => {
    if (!isRunning) {
      setTimer(0);
    } else {
      setResetOnStop(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(timer)}</Text>
      <Button title="Reset" onPress={handleReset} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 48,
  },
});

export default Stopwatch;
