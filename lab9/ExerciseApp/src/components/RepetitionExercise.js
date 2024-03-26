import React, { useState } from 'react';


export default function RepitionExercise({exercise, setMenuScreen}) {
    let [count, setCount] = useState(0)
    return <div>
      <p>{exercise.name}</p>
      <p style={{fontSize:"5em"}}>{count}</p>
      <button style={{fontSize:"2em"}}
        onClick={() => setCount(count=>count+1)}>Increment</button>
      <button style={{fontSize:"2em"}}
        onClick={() => setCount(0)}>Reset</button><br/>
        <button style={{fontSize:"1em"}} onClick={setMenuScreen}>Back to Menu</button>
      </div>
  }