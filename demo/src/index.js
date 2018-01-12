import React, {Component} from 'react'
import {render} from 'react-dom'

import AppolodoroMediaRecorder from '../../src'

class Demo extends Component {

  constructor(props){
    super(props)

    this.state = {
      show : true
    }
  }

  handleOnError = (error) =>{
    console.log(error)
  }

  handleUnavailable = (error) => {
    this.setState({
      show : false
    })
  }

  render() {
    return <div>
      {(this.state.show)&&
        <AppolodoroMediaRecorder 
        onError = { this.handleOnError } 
        unavailable = { this.handleUnavailable }
        />
      }

    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
