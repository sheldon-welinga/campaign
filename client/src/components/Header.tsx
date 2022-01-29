import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const token = sessionStorage.getItem('__token__')
  const userStorageInfo = sessionStorage.getItem('__userInfo__')
  const userInfo = JSON.parse(userStorageInfo ?? '{}')
  const navigate = useNavigate()

  const handleLogOut = () => {
    sessionStorage.clear()
    navigate('/login')
  }

  if (!token) {
    return null
  }

  return (
    <nav className='header'>
      <div>
        <Link to='/dashboard' className='nav-item'>
          Home
        </Link>
        <Link to='/about-us' className='nav-item'>
          About Us
        </Link>
        <Link to='/partners' className='nav-item'>
          Partners
        </Link>
      </div>
      <div className='nav-item-right'>
        {userInfo && (
          <button className='btn btn-outline'>{userInfo?.name}</button>
        )}
        <button className='btn btn-outline' onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </nav>
  )
}

export default Header
