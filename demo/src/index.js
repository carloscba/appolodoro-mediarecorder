import React, {Component} from 'react'
import {render} from 'react-dom'

import AppolodoroMediaRecorder from '../../src'

class Demo extends Component {

  handleOnError = (error) =>{
    console.log(error)
  }

  render() {
    return <div>
      <AppolodoroMediaRecorder onError = { this.handleOnError } />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
