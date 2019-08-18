import React from 'react'
import '../App.css'
import SetLength from './SetLength'
import Timer from '../components/Timer'
import moment from 'moment'

class App extends React.Component {
  constructor(props){
    super (props)
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      isSession: true,
      isCounting: false,
      timeLeft: moment({minutes: 25})
    }
  }

  incrementLength = (name) => {
    if(this.state.isCounting) {
      return
    }
    if(name === 'session') {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        timeLeft: moment({minutes: this.state.sessionLength + 1})
      })
    } else {
      this.setState({
        breakLength: this.state.breakLength + 1,
      })
    }
  }

  decrementLength = (name) => {
    if(this.state.isCounting) {
      return
    }
    if (name === 'break') {
      if(this.state.breakLength === 1) {
        return
      }
      this.setState({breakLength: this.state.breakLength - 1})
    } else {
      if(this.state.sessionLength === 1) {
        return
      }
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        timeLeft: moment({minutes: this.state.sessionLength - 1})
      })
    }
  }
  
  handleReset = () => {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      isSession: true,
      timeLeft: moment({minutes: 25})
    })
  }

  handlePlay = () => {
    this.setState({
      isCounting: !this.state.isCounting
    })
    const interval = setInterval(() => {
      if (this.state.isCounting) {
        if (this.state.timeLeft.isSame(moment({seconds: 0}))) {
          const update = this.state.isSession ? this.state.breakLength : this.state.sessionLength
          this.setState({
            isSession: !this.state.isSession,
            timeLeft: moment({ minutes: update })
          })
        }
        this.setState({
          timeLeft: this.state.timeLeft.subtract(1, 'seconds')
        })

      } else {
        clearInterval(interval)
      }
    }, 1000)


  }

  render() {
    const { breakLength, sessionLength, timeLeft } = this.state
    return (
      <div className="App">
      <h1>Pomodoro clock - balance your work!</h1>
        <SetLength 
        length={breakLength}
        name={'break'}
        decLength={this.decrementLength}
        incLength={this.incrementLength}
        />
        <SetLength 
        length={sessionLength}
        name={'session'}
        decLength={this.decrementLength}
        incLength={this.incrementLength}
        />
        <Timer 
        breakLength={breakLength} 
        sessionLength={sessionLength} 
        timeLeft={timeLeft}
        handleReset={this.handleReset}
        handlePlay={this.handlePlay}        
        />
      </div>
    )
  }
}

export default App
