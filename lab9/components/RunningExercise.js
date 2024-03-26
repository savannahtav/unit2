import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function RunningExercise({ setMenuScreen }) {
  const [lapTimes, setLapTimes] = useState([]);
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
    setLapTimes([]);
  };

  const recordLap = () => {
    const lapTime = `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}:${count % 100 < 10 ? `0${count % 100}` : count % 100}`;
    setLapTimes(prevLaps => [...prevLaps, lapTime]);
  };

  React.useEffect(() => {
    let seconds = Math.floor(count / 100) % 60;
    let minutes = Math.floor(count / (100 * 60)) % 60;

    setHour(0);
    setMinute(minutes);
    setSecond(seconds);
  }, [count]);

  return (
    <View style={styles.container}>
      <View style={styles.timer}>
        <Text style={styles.time}>{`${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}:${count % 100 < 10 ? `0${count % 100}` : count % 100}`}</Text>
      </View>
      <View style={styles.buttons}>
        <Button title="Start" onPress={startTimer} />
        <Button title="Stop" onPress={stopTimer} />
        <Button title="Reset" onPress={resetTimer} />
        <Button title="Record Lap" onPress={recordLap} />
      </View>
      <View style={styles.lapTimes}>
        <Text style={styles.heading}>Lap Times</Text>
        <View>
          {lapTimes.map((lap, index) => (
            <Text key={index}>{lap}</Text>
          ))}
        </View>
      </View>
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
    marginBottom: 20,
  },
  lapTimes: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
