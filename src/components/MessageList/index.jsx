import React, { Component } from 'react'

import Message from '../Message'

import styles from './message-list.css'


class MessageList extends Component {
	constructor (props) {
		super(props)
	}

	render () {
		return (
			<div className={styles.root}>
				{this.props.messages.map(msg => {
					return (
						<Message 
							key={msg.id}
							text={msg.text}
							picture={msg.picture}
							displayName={msg.displayName}
							userName={msg.userName}
							date={msg.date}
						/>
					)
				}).reverse()}
			</div>
		)
	}
}

export default MessageList