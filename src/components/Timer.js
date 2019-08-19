import React from 'react'
import  timerStyles from './timer.module.css'

const Timer = (props) => {
    return (
        <div className={timerStyles.timer}>
        <h2>{props.isSession ? 'Session!' : 'Break!'}</h2>
        <h2>{props.timeLeft.format('mm:ss')}</h2>
        </div>

    )
}

export default Timer