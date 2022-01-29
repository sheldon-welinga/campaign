import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Routes from './routes/Routes'

const App: React.FC = (): JSX.Element => {
  return (
    <div className='app-wrapper'>
      <Router>
        <Header />
        <Routes />
      </Router>
    </div>
  )
}

export default App
