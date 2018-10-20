import React, { Component } from 'react'
import Main from './main'
import Header from './header'
import Footer from './footer'
import withRoot from '../withRoot.js'
class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}

export default withRoot(App)
