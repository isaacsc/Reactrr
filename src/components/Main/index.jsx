import React, { Component } from 'react'
import uuid from 'uuid'

import InputText from '../InputText'
import MessageList from '../MessageList'
import ProfileBar from '../ProfileBar'

class Main extends Component {
	constructor () {
		super()
		this.state = {
			openText: false,
			messages: [
				{
					id: uuid.v4(),
					text: 'Mensaje del tweet',
					picture: 'https://pbs.twimg.com/profile_images/549948122944659456/EwQFaYtv_bigger.jpeg',
					displayName: 'Isaac Sanchez',
					userName: 'isaacsc',
					date: Date.now() - 180000
				},
				{ 
					id: uuid.v4(),
					text: 'Este es otro mensaje',
					picture: 'https://pbs.twimg.com/profile_images/549948122944659456/EwQFaYtv_bigger.jpeg',
					displayName: 'Isaac Sanchez',
					userName: 'isaacsc',
					date: Date.now() - 1800000
				}
			]
		}

		this.handleCloseText = this.handleCloseText.bind(this)
		this.handleOpenText = this.handleOpenText.bind(this)
		this.handleSendText = this.handleSendText.bind(this)
	}

	handleCloseText (event) {
		event.preventDefault()
		this.setState({ openText: false })
	}

	handleSendText (event) {
		event.preventDefault()
		let newMessage = {
			id: uuid.v4(),
			userName: this.props.user.email.split('@')[0],
			displayName: this.props.user.displayName,
			picture: this.props.user.photoURL,
			date: Date.now(),
			text: event.target.text.value
		}

		this.setState({
			messages: this.state.messages.concat(newMessage),
			openText: false
		})
	}

	handleOpenText (event) {
		event.preventDefault()
		this.setState({ openText: true })
	}

	renderOpenText () {
		if(this.state.openText) {
			return <InputText 
				onSendText={this.handleSendText}
				onCloseText={this.handleCloseText}
			/>
		}
	}

	render () {
		return (
			<div>
				<ProfileBar 
					picture={this.props.user.photoURL}
					userName={this.props.user.email.split('@')[0]}
					onOpenText={this.handleOpenText}
				/>
				{this.renderOpenText()}
				<MessageList messages={this.state.messages}>Main</MessageList>  
			</div>
		)
	}
}

export default Main