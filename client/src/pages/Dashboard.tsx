import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const token = sessionStorage.getItem('__token__')

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [navigate, token])

  return (
    <div className='dashboard bg-orange'>
      <div className='wrapper'>
        <div className='image'>
          <img src='/images/world.jpeg' alt='world' />
        </div>
        <div className='content'>
          <h1>"With awareness come responsibility and choice"</h1>
          <button className='btn btn-purple'>Raise a cause</button>
        </div>
      </div>
      <div className='wrapper'>
        <div className='content'>
          <h1>"When you support a small business, you support a dream"</h1>
          <button className='btn btn-purple'>Learn more</button>
        </div>
        <div className='image'>
          <img src='/images/laptop.jpeg' alt='laptop and person' />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
