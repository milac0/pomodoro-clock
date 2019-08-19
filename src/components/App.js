import React from 'react'
import '../App.css'
import SetLength from './SetLength'
import Timer from '../components/Timer'
import Controls from '../components/Controls'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserClock } from '@fortawesome/free-solid-svg-icons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      isSession: true,
      isCounting: false,
      timeLeft: moment({ minutes: 25 }),
      sessionsDone: []
    }
  }

  incrementLength = (name) => {
    if (this.state.isCounting) {
      return
    }
    if (name === 'session' && this.state.sessionLength < 59) {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        timeLeft: moment({ minutes: this.state.sessionLength + 1 })
      })
    } else if (name === 'break' && this.state.breakLength < 59) {
      this.setState({
        breakLength: this.state.breakLength + 1,
      })
    }
  }

  decrementLength = (name) => {
    if (this.state.isCounting) {
      return
    }
    if (name === 'break') {
      if (this.state.breakLength === 1) {
        return
      }
      this.setState({ breakLength: this.state.breakLength - 1 })
    } else {
      if (this.state.sessionLength === 1) {
        return
      }
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        timeLeft: moment({ minutes: this.state.sessionLength - 1 })
      })
    }
  }

  handleReset = () => {
    clearInterval(this.interval)
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      isCounting: false,
      isSession: true,
      timeLeft: moment({ minutes: 25 })
    })
  }

  handlePlay = () => {
    this.setState({
      isCounting: !this.state.isCounting
    })
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      if (this.state.isCounting) {
        if (this.state.timeLeft.isSame(moment({ seconds: 0 }))) {
          const update = this.state.isSession ? this.state.breakLength : this.state.sessionLength
          this.setState({
            isSession: !this.state.isSession,
            timeLeft: moment({ minutes: update }),
            sessionsDone: [...this.state.sessionsDone, '+']
          })
        }
        this.setState({
          timeLeft: this.state.timeLeft.subtract(1, 'seconds')
        })
      }
    }, 1000)


  }

  render() {
    const { breakLength, sessionLength, timeLeft, isSession, sessionsDone } = this.state
    const description = sessionsDone.length !== 0 ? (
      sessionsDone.map((s, i) => i % 2 === 0 ? <span><FontAwesomeIcon key={i} icon={faUserClock} /></span> : null)
    ) : `Let's get started!`
    return (
      <div className="App">
        <h1>Pomodoro clock - balance your work!</h1>
        <h2>Sessions done: {description}</h2>
        <div className='settings' >
          <SetLength
            length={sessionLength}
            name={'session'}
            decLength={this.decrementLength}
            incLength={this.incrementLength}
          />
          <Timer
            timeLeft={timeLeft}
            isSession={isSession}
          />
          <SetLength
            length={breakLength}
            name={'break'}
            decLength={this.decrementLength}
            incLength={this.incrementLength}
          />
        </div>
        <Controls
          handlePlay={this.handlePlay}
          handleReset={this.handleReset}
        />
      </div>
    )
  }
}

export default App
