import React, { Component } from 'react'
import 'normalize-css'

import Header from '../Header'
import Main from '../Main'

import styles from './app.css'

class App extends Component {
	render () {
		return (
			<div>
				<Header />
				<Main />
			</div>    
		)
	}
}

export default App