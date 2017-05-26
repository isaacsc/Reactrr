import React, { Component } from 'react'
import uuid from 'uuid'

import InputText from '../InputText'
import MessageList from '../MessageList'
import ProfileBar from '../ProfileBar'

class Main extends Component {
	constructor (props) {
		super(props)
		
		this.state = {
			user: Object.assign({}, this,props.user, {retweets: []}, {favorites: []}),
			openText: false,
			userNameToReply: '',
			messages: [
				{
					id: uuid.v4(),
					text: 'Mensaje del tweet',
					picture: 'https://pbs.twimg.com/profile_images/549948122944659456/EwQFaYtv_bigger.jpeg',
					displayName: 'Isaac Sanchez',
					userName: 'isaacsc',
					date: Date.now() - 180000,
					retweets: 0,
					favorites: 0
				},
				{ 
					id: uuid.v4(),
					text: 'Este es otro mensaje',
					picture: 'https://pbs.twimg.com/profile_images/549948122944659456/EwQFaYtv_bigger.jpeg',
					displayName: 'Pepe Perez',
					userName: 'peperez',
					date: Date.now() - 1800000,
					retweets: 0,
					favorites: 0
				}
			]
		}

		this.handleCloseText = this.handleCloseText.bind(this)
		this.handleFavorite = this.handleFavorite.bind(this)
		this.handleOpenText = this.handleOpenText.bind(this)
		this.handleSendText = this.handleSendText.bind(this)
		this.handleRetweet = this.handleRetweet.bind(this)
		this.handleReplyTweet = this.handleReplyTweet.bind(this)
	}

	handleCloseText (event) {
		event.preventDefault()
		this.setState({ openText: false })
	}

	handleFavorite (msgId) {
		let alreadyFavorited = this.state.user.favorites.filter(fav => fav === msgId)

		if (alreadyFavorited.length === 0) {
			let messages = this.state.messages.map( msg => {
				if (msg.id === msgId) {
					msg.favorites ++
				}
				return msg
			})

			let user = Object.assign({}, this.state.user)
			user.favorites.push(msgId)

			this.setState({
				messages,
				user
			})
		}
	}

	handleReplyTweet(msgId, userNameToReply) {
		this.setState({
			openText: true,
			userNameToReply
		})
	}

	handleRetweet (msgId) {
		let alreadyRetweeted = this.state.user.retweets.filter(rt => rt === msgId)

		if (alreadyRetweeted.length === 0) {
			let messages = this.state.messages.map( msg => {
				if (msg.id === msgId) {
					msg.retweets ++
				}
				return msg
			})

			let user = Object.assign({}, this.state.user)
			user.retweets.push(msgId)

			this.setState({
				messages,
				user
			})
		}
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
				userNameToReply={this.state.userNameToReply}
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
				<MessageList 
					messages={this.state.messages}
					onRetweet={this.handleRetweet}
					onReplyTweet={this.handleReplyTweet}
					onFavorite={this.handleFavorite}
				></MessageList>  
			</div>
		)
	}
}

export default Main