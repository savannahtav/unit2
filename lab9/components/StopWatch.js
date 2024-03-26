import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function StopWatch() {
  const [timer, setTimer] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [count, setCount] = useState(0);

  const intervalRef = useRef();

  const startTimer = () => {
    if (!timer) {
      setTimer(true);
      intervalRef.current = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 10);
    }
  };

  const stopTimer = () => {
    if (timer) {
      setTimer(false);
      clearInterval(intervalRef.current);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setHour(0);
    setMinute(0);
    setSecond(0);
    setCount(0);
  };

  React.useEffect(() => {
    let seconds = Math.floor(count / 100) % 60;
    let minutes = Math.floor(count / (100 * 60)) % 60;
    let hours = Math.floor(count / (100 * 60 * 60));

    setHour(hours);
    setMinute(minutes);
    setSecond(seconds);
  }, [count]);

  return (
    <View style={styles.container}>
      <View style={styles.timer}>
        <Text style={styles.time}>{`${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}:${count % 100 < 10 ? `0${count % 100}` : count % 100}`}</Text>
      </View>
      <View style={styles.buttons}>
        <Button title="Start" onPress={startTimer} />
        <Button title="Stop" onPress={stopTimer} />
        <Button title="Reset" onPress={resetTimer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  timer: {
    marginBottom: 20,
  },
  time: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
