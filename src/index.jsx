import React, { Component } from 'react'
import { render } from 'react-dom'

class Test extends Component {
  render () {
    return ( <h1>Reacttr</h1> )
  }
}

render(<Test />, document.getElementById('root'))