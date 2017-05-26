import React, { Component } from 'react'
import { HashRouter, Match } from 'react-router'
import 'normalize-css'

import Header from '../Header'
import Login from '../Login'
import Main from '../Main'
import Profile from '../Profile'

import styles from './app.css'

class App extends Component {
	constructor () {
		super()
		this.state = {
			user: {
				photoURL: 'https://pbs.twimg.com/profile_images/549948122944659456/EwQFaYtv_bigger.jpeg',
				email: 'isaacsan@gmail.com',
				displayName: 'Isaac Sánchez',
				location: 'Madrid, España'
			}
		}

		this.handleOnAuth = this.handleOnAuth.bind(this)
	}

	handleOnAuth () {
		console.log('Auth')
	}

	render () {
		return (
			<HashRouter>
				<div>
					<Header />
					<Match exactly pattern="/" render={ () => {
						if (this.state.user) {
							return (<Main user={this.state.user}/>)
						} else {
							return (<Login onAuth={this.handleOnAuth}/>)
						}
					}} />

					<Match exactly pattern="/profile" render={ () => 
						<Profile 
							picture={this.state.user.photoURL}
							userName={this.state.user.email.split('@')[0]}
							displayName={this.state.user.displayName}
							location={this.state.user.location}
							emailAddress={this.state.user.email}
						/>
					} />

					<Match exactly pattern="/user/:userName" render={({ params }) => 
						<Profile 
							userName={params.userName}
							displayName={params.userName}
						/>
					
					} />
				</div>		
			</HashRouter>  
		)
	}
}

export default App