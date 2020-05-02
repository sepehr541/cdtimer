import React, { useState } from 'react';
import './App.css';
import Timer from './Timer'
import UserInput from './UserInput'
function App() {
  const [timer, setTimer] = useState(null)

  const handleClick = (name, date, time) => {
    setTimer(<Timer endDate={time === undefined ? new Date(`${date}T00:00:00`): new Date(`${date}T${time}`)} name={name}/>)
  }
  return (
    <div className="App container center-aligned section">
      <UserInput handleClick={handleClick}/>
      {timer}
    </div>
  )
}

export default App;
