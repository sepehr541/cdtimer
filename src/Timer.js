import React, { useEffect, useState, useRef, useCallback } from 'react';
import Circle from './Circle';

const isLeap = (date) => {
    return !(new Date(date.getFullYear(), 1, 29).getMonth() - 1)
}

const dayOfTheYear = (date) => {
    let day = 0;
    let month = date.getMonth();
    for (let i = 0; i < month; i++) {
        // 30 day months
        if (i === 3 || i === 5 || i === 8 || i === 10) {
            day += 30;
            // february with 29 days
        } else if (i === 1) {
            if (isLeap(date))
                day += 29;
            else {
                day += 28;
            }
        } else {
            day += 31;
        }
    }
    day += date.getDate();
    return day;

}

const calcRemainingTime = (endDate) => {
    const now = new Date();
    // cal remaining
    let days = dayOfTheYear(endDate) - dayOfTheYear(now);

    if (days < 0) {
        days = days + (isLeap(new Date()) ? 366 : 365)
    }

    let year = Math.floor(days / 365);

    // acount for remainig day is not a full day
    days--;

    let hours = endDate.getHours() - now.getHours() - 1;
    if (hours < 0) {
        hours += 24;
    }

    let minutes = endDate.getMinutes() - now.getMinutes() - 1;

    if (minutes < 0) {
        minutes += 60;
    }


    let seconds = endDate.getSeconds() - now.getSeconds();

    if (seconds < 0) {
        seconds += 60;
    }

    return {
        year,
        days,
        hours,
        minutes,
        seconds
    }


}

const countDown = (dateObj) => {
    let res = { ...dateObj }
    let secs = res.seconds - 1;
    if (secs === 0) {
        res.minutes--;
        res.seconds = 60
    } else {
        res.seconds = secs
    }

    if (res.minutes === -1) {
        res.hours--;
        res.minutes = 59;
    }

    if (res.hours === -1) {
        res.days--;
        res.hours = 23
    }

    return res;

}


/**
 * HELP FROM 
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * Every render a new callback function is put into callbackRef to be called by the interval
 * In other words, changing what the interval calls without reseting the interval
 */

const Timer = (props) => {
    let [count, setCount] = useState(calcRemainingTime(props.endDate));

    const savedCallback = useRef();

    let callback = useCallback(
        () => {
            setCount(countDown(count))
        },
        [count],
    )

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        let id = setInterval(() => { savedCallback.current(); }, 1000);
        return () => clearInterval(id);
    }, []);


    return (
        <div className='timer' style={{ display: 'flex' }} >
            <div id='year'>

            </div>
            <div id='days'>
                <Circle title={'Days'} data={count.days} />
            </div>
            <div id='hours'>
                <Circle title={'Hours'} data={count.hours} />
            </div>
            <div id='mins'>
                <Circle title={'Minutes'} data={count.minutes} />
            </div>
            <div id='secs'>
                <Circle title={'secs'} data={count.seconds} />
            </div>
            <div>
                <p>Until {props.name}</p>
            </div>
        </div>
    )
}

export default Timer;