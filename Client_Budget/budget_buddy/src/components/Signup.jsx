import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Signin.css'

export default function Signup() {

  const navigation = useNavigate()
  const { login } = useAuth()

  const [userName, setUserName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('')

  const handleAlertTimer = () => {
    setTimeout(() => {
      setAlertMessage('')
      setAlertType('')
    }
      , 3000)
  }

  const HandleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (password !== confirmPassword) {
        setAlertMessage('Both password and confirm password should match')
        setAlertType('error')
        handleAlertTimer()
        return false
      }
    else if (password.length < 8) {
      setAlertMessage('Password must be at least 8 characters long.')
      setAlertType('error')
        handleAlertTimer()
        return false
    }
    
    // Check for at least one number
    else if (!/\d/.test(password)) {
      setAlertMessage('Password must contain at least one number.')
      setAlertType('error')
        handleAlertTimer()
        return false
    }
    
    // Check for at least one lowercase letter
    else if (!/[a-z]/.test(password)) {
      setAlertMessage('Password must contain at least one lowercase letter.')
      setAlertType('error')
        handleAlertTimer()
        return false
    }
    
    // Check for at least one uppercase letter
    else if (!/[A-Z]/.test(password)) {
      setAlertMessage('Password must contain at least one uppercase letter.')
      setAlertType('error')
        handleAlertTimer()
        return false
    }
    
    // Check for at least one special character
    else if (!/[!@#\$%\^&]/.test(password)) { // Update this regex based on the special characters you want to require
        setAlertMessage('Password must contain at least one special character ')
        setAlertType('error')
        handleAlertTimer()
        return false
    }else{
      const response = await axios.post('http://localhost:8000/signup/', {
        username: userName,
        password: password,
        first_name: firstName,
        last_name: lastName,
        email: email
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      if (response.status === 200) {
        navigation('/signin')
      }
    }
    } catch (error) {
      console.error('Error during sign in:', error.response ? error.response.data : error.message)

    }
   
  }
  


  return (
    <div className="signup-container">
      <h3>Register</h3>
      <form onSubmit={HandleSubmit}>

        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInput1" placeholder="User Name" required onChange={e => setUserName(e.target.value)} />

        </div>

        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInput2" placeholder="First Name" required onChange={e => setFirstName(e.target.value)} />

        </div>

        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInput3" placeholder="Last Name" onChange={e => setLastName(e.target.value)} />

        </div>

        <div className="form-floating">
          <input type="email" className="form-control" id="floatingInput4" placeholder="name@example.com" required onChange={e => setEmail(e.target.value)} />

        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword5" placeholder="Password" required onChange={e => setPassword(e.target.value)} />

        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword6" placeholder="Confirm Password" required onChange={e => setConfirmPassword(e.target.value)} />

        </div>
         <button className="btn btn-primary sign-up" type="submit">Sign Up</button><br/><br />

        <button className="btn btn-primary2" type="button">Sign in</button>
       
      </form>

      <div className="alert-container">
        {alertMessage && (
          <div className={`alert ${alertType === 'success' ? 'alert-success' : 'alert-error'}`}>
            {alertMessage}
          </div>
        )}
      </div>
    </div>
  )
}