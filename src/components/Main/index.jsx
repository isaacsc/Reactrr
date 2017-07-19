import React, { Component, PropTypes } from 'react'
import uuid from 'uuid'
import firebase from 'firebase'
import InputText from '../InputText'
import MessageList from '../MessageList'
import ProfileBar from '../ProfileBar'

const propTypes = {
	user: PropTypes.object.isRequired,
	onLogOut: PropTypes.func.isRequired
}

class Main extends Component {
	constructor (props) {
		super(props)
		
		this.state = {
			user: Object.assign({}, this,props.user, {retweets: []}, {favorites: []}),
			openText: false,
			userNameToReply: '',
			messages: []
		}

		this.handleCloseText = this.handleCloseText.bind(this)
		this.handleFavorite = this.handleFavorite.bind(this)
		this.handleOpenText = this.handleOpenText.bind(this)
		this.handleSendText = this.handleSendText.bind(this)
		this.handleRetweet = this.handleRetweet.bind(this)
		this.handleReplyTweet = this.handleReplyTweet.bind(this)
	}

	componentWillMount () {
		const messageRef = firebase.database().ref().child('messages')

		messageRef.on('child_added', snapshot => {
			this.setState({ 
				messages: this.state.messages.concat(snapshot.val()),
				openText: false
			})
		})
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
			text: event.target.text.value,
			favorites: 0,
			retweets: 0
		}

		const messageRef = firebase.database().ref().child('messages')
		const messageID = messageRef.push()
		messageID.set(newMessage)
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
					onLogOut={this.props.onLogOut}
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