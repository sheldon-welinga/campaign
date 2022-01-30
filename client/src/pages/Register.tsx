import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { handleFetch } from '../utils/axios'

type RegisterProps = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const Register: React.FC = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [registerValues, setRegisterValues] = useState<RegisterProps>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const token = sessionStorage.getItem('__token__')

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [navigate, token])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterValues({
      ...registerValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      e.stopPropagation()

      const { confirmPassword, ...restValues } = registerValues

      if (registerValues.password !== confirmPassword) {
        enqueueSnackbar(`Password do not match!`, {
          anchorOrigin: {
            horizontal: 'right',
            vertical: 'top'
          },
          variant: 'error'
        })
      }

      const data = await handleFetch('/users/register', 'post', restValues)
      await sessionStorage.setItem('__token__', JSON.stringify(data.data.token))
      await sessionStorage.setItem(
        '__userInfo__',
        JSON.stringify(data.data.user)
      )

      navigate('/dashboard')
    } catch (err: any) {
      enqueueSnackbar(err.message, {
        variant: 'error',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        }
      })
    }
  }

  return (
    <div className='account bg-orange'>
      <div className='wrapper'>
        <div className='account-header'>
          <h1 className='title'>Create new Account</h1>
          <p>
            Already Registered? <Link to='/login'>Login</Link>
          </p>
        </div>
        <div className='form-wrapper'>
          <form onSubmit={handleSubmit}>
            <div className='element'>
              <p className='title'>Name</p>
              <input
                type='text'
                placeholder='Full name'
                id='name'
                name='name'
                className='form-control'
                value={registerValues.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='element'>
              <p className='title'>Email</p>
              <input
                type='email'
                placeholder='example@gmail.com'
                id='email'
                name='email'
                className='form-control'
                value={registerValues.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='element'>
              <p className='title'>Password</p>
              <input
                type='password'
                placeholder='********'
                id='password'
                name='password'
                className='form-control'
                value={registerValues.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className='element'>
              <p className='title'>Confirm Password</p>
              <input
                type='password'
                placeholder='********'
                id='confirmPassword'
                name='confirmPassword'
                className='form-control'
                value={registerValues.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className='element btn-wrapper'>
              <button className='btn btn-primary'>Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
