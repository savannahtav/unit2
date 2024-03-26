import React, { useState, useRef } from 'react';

function Timer() {
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
      <button id="start" onClick={startTimer}>Start</button>
      <button id="stop" onClick={stopTimer}>Stop</button>
      <button id="reset" onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default Timer;
