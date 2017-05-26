import React, { Component } from 'react'

import styles from './login.css'

class login extends Component {
  constructor() {
    super();
  }

  render () {
    return (
      <div className={styles.root}>
        <p className={styles.text}>
          Necesitamos que inicies sesión con tu cuenta de Github para que puedas leer y escribir mensajes
        </p>
        <button
          onClick={this.props.onAuth}
          className={styles.button}
        >
          Login con Github
        </button>
        
      </div>    
    )
  }
}

export default login