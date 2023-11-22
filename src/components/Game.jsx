import React from 'react'
import { useState, useRef } from 'react'

const bgColors = { 'blue': '#1a759f', 'red': '#81171b', 'green': '#4f772d' }

export default function Game() {

    const [color, setColor] = useState('blue');
    const [isClicked, setIsClicked] = useState(false);

    const colorText = useRef();

    const startTime = useRef();
    const endTime = useRef();
    const reactTime = useRef();

    const randomTime = Math.floor(Math.random() * 6) + 3;
    const timer = useRef();

    if (color === 'blue') {
        colorText.current = `Let's see if you're fast enough`;
    }

    else if (color === 'red') {
        colorText.current = `Click here when the color changes.`;
        timer.current = setTimeout(() => {
            startTime.current = Date.now();
            setColor('green');
        }, randomTime * 1000);
    }

    else {
        console.log("Started at", startTime.current)
        colorText.current = isClicked ? `${reactTime.current} ms` : 'time to shine';
    }

    const handleOnClick = () => {

        clearTimeout(timer.current);

        if (color === 'blue') {
            setColor('red');
        }

        else if (color === 'green') {
            if (!isClicked) {
                endTime.current = Date.now();
                console.log("Ended at", endTime.current)
                reactTime.current = endTime.current - startTime.current;
                console.log("React time", reactTime.current)
                setIsClicked(true);
            }
            else {
                setColor('red');
                setIsClicked(false);
            }
        }
    }

    return (
        <button className='game' onClick={handleOnClick} style={{ backgroundColor: bgColors[color] }}>
            <h1 className='game-head'>{colorText.current}</h1>
        </button>
    )
}
