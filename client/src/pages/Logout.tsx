import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Logout: React.FC = () => {
  const navigate = useNavigate()
  const token = sessionStorage.getItem('__token__')

  useEffect(() => {
    if (token) {
      navigate('/dashboard')
    }
  }, [navigate, token])

  return (
    <div className='logout bg-orange'>
      <div className='wrapper'>
        <h1>You have been successfully logged out</h1>
        <Link to='/login' className='btn btn-primary'>
          Log Back in
        </Link>
      </div>
    </div>
  )
}

export default Logout
