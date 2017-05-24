import React, { Component } from 'react'
import 'normalize-css'

import Header from '../Header'
import Main from '../Main'

import styles from './app.css'

class App extends Component {
	constructor () {
		super()
		this.state = {
			user: {
				photoURL: 'https://pbs.twimg.com/profile_images/549948122944659456/EwQFaYtv_bigger.jpeg',
				email: 'isaacsan@gmail.com',
				displayName: 'Isaac Sánchez'
			}
		}
	}
	render () {
		return (
			<div>
				<Header />
				<Main user={this.state.user}/>
			</div>    
		)
	}
}

export default App