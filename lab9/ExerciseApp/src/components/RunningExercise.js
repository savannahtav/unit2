import React, { useState } from 'react';

export default function RunningExercise({ setMenuScreen }) {
  const [lapTimes, setLapTimes] = useState([]);
  const [timer, setTimer] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [count, setCount] = useState(0);

  const intervalRef = React.useRef();

  const startTimer = () => {
    if (!timer) {
      setTimer(true);
      intervalRef.current = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
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
    setLapTimes((prevLaps) => [...prevLaps, lapTime]);
  };

  React.useEffect(() => {
    let seconds = Math.floor(count / 100) % 60;
    let minutes = Math.floor(count / (100 * 60)) % 60;

    setHour(0);
    setMinute(minutes);
    setSecond(seconds);
  }, [count]);

  return (
    <div>
      <div>
        <span id="min">{minute < 10 ? `0${minute}` : minute}</span>:
        <span id="sec">{second < 10 ? `0${second}` : second}</span>:
        <span id="count">{count % 100 < 10 ? `0${count % 100}` : count % 100}</span>
      </div>
      <div>
        <button id="start" onClick={startTimer}>Start</button>
        <button id="stop" onClick={stopTimer}>Stop</button>
        <button id="reset" onClick={resetTimer}>Reset</button>
        <button onClick={recordLap}>Record Lap</button>
      </div>
      <div>
        <h2>Lap Times</h2>
        <ul>
          {lapTimes.map((lap, index) => (
            <li key={index}>{lap}</li>
          ))}
        </ul>
      </div>
      <button onClick={setMenuScreen}>Back to Menu</button>
    </div>
  );
}
