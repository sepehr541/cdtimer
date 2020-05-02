import React, { useState } from 'react'

const UserInput = (props) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState();

    return (
        <div className='userInput row'>
            <div className='input-field'>
                <input className='col s3' id='name' type='text' onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='input-field'>
                <input className='col s3' id='date' type='date' onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className='input-field'>
                <input className='col s3' id='time' type='time' onChange={(e) => setTime(e.target.value)} />
            </div>
            <button id='start' onClick={() => props.handleClick(name, date, time)}>Start!</button>
        </div>
    )
}

export default UserInput;