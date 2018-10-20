import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import App from './components/App'
const render = Component => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

export default hot(module)(render(App))

if (module.hot) {
  module.hot.accept()
}
