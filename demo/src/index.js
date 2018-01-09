import React, {Component} from 'react'
import {render} from 'react-dom'

import AppolodoroMediaRecorder from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <AppolodoroMediaRecorder />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
