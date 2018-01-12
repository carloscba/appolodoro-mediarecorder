# appolodoro-mediarecorder

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Describe appolodoro-mediarecorder here.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

```js

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

```