import React from 'react'
import  timerStyles from './timer.module.css'

const Timer = ({ handlePlay, handleReset, timeLeft }) => {
    return (
        <div className={timerStyles.timer}>
        <p>Timer: sess/break: {timeLeft.format('mm:ss')}</p>
        <button onClick={handlePlay} >play/pause</button>
        <button onClick={handleReset} >reset</button>
        </div>

    )
}

export default Timer