import React, { Component } from 'react'

import MessageList from '../MessageList'

class Main extends Component {
	constructor () {
		super()
		this.state = {
			messages: [
				{ 
					text: 'Mensaje del tweet',
					picture: 'https://pbs.twimg.com/profile_images/549948122944659456/EwQFaYtv_bigger.jpeg',
					displayName: 'Isaac Sanchez',
					userName: 'isaacsc',
					date: Date.now() - 180000
				},
				{ 
					text: 'Este es otro mensaje',
					picture: 'https://pbs.twimg.com/profile_images/549948122944659456/EwQFaYtv_bigger.jpeg',
					displayName: 'Isaac Sanchez',
					userName: 'isaacsc',
					date: Date.now() - 1800000
				}
			]
		}
	}

	render () {
		return (
			<MessageList messages={this.state.messages}>Main</MessageList>    
		)
	}
}

export default Main