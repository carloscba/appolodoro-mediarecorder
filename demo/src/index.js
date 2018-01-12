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

  handleTakePhoto = (imageData) => {
    this.setState({
      imageData
    })
  }

  render() {
    return <div>
      {(this.state.show)&&
        <AppolodoroMediaRecorder 
        onError = { this.handleOnError } 
        onTakePhoto = { this.handleTakePhoto } 
        unavailable = { this.handleUnavailable }
        />
      }
      <img src={ this.state.imageData } />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
