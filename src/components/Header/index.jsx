import React, { Component } from 'react'

import styles from './header.css'

class Header extends Component {
  render () {
    return (
      <header className={styles.root}>
        <h1 className={styles.logo}>Reacttr</h1>
      </header>    
    )
  }
}

export default Header