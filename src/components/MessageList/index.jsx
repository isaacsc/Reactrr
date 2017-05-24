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
							text={msg.text}
							picture={msg.picture}
							displayName={msg.displayName}
							userName={msg.userName}
							date={msg.date}
						/>
					)
				})}
			</div>
		)
	}
}

export default MessageList