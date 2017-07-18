import React, { Component } from 'react'
import { HashRouter, Match } from 'react-router'
import firebase from 'firebase'
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
			user : null
		}
		
		this.handleOnAuth = this.handleOnAuth.bind(this)
		this.handleLogOut = this.handleLogOut.bind(this)
	}

	// Función del ciclo de  vida que se ejecuta justo después del renderizado cuando el DOM esta disponible
	componentWillMount () {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({ user })
			} else {
				this.setState({ user : null})
			}
		})
	}


	handleOnAuth () {
		const provider = new firebase.auth.GithubAuthProvider()

		firebase.auth().signInWithPopup(provider)
			.then( result => console.log(`${result.user.email} ha iniciado sesión`))
			.catch( error => console.log(`Error: ${error.code} ${error.message}`))	
	}

	handleLogOut () {
		firebase.auth().signOut()
			.then(() => console.log('Te has desconectado correctamente'))
			.catch( error => console.log(`Error: ${error.code} ${error.message}`))	
		}

	render () {
		return (
			<HashRouter>
				<div>
					<Header />
					<Match exactly pattern="/" render={ () => {
						if (this.state.user) {
							return (<Main 
								user={this.state.user}
								onLogOut={this.handleLogOut}
							/>)
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