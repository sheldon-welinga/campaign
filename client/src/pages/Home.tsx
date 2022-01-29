import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className='home bg-orange'>
      <div className='home-left'>
        <div className='content'>
          <h1 className='title'>We can</h1>
          <h5 className='sub-title'>Just imagine</h5>
        </div>
        <div className='button-wrapper'>
          <Link to='/signup' className='btn btn-primary'>
            Join now
          </Link>
          <Link to='/login' className='btn btn-outline'>
            log in
          </Link>
        </div>
      </div>
      <div className='home-right'>
        <div>
          <img src='images/rocks.jpeg' alt='Rocks' />
        </div>
      </div>
    </div>
  )
}

export default Home
