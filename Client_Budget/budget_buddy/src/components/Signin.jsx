import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Signup from './Signup'
import '../styles/Signin.css'

export default function Signin() {

    const navigation = useNavigate()

    const { login } = useAuth()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const [alertMessage, setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState('')

    //Setting timeout to clear the Alert MSG
    const handleAlertTimer = () => {
        setTimeout(() => {
            setAlertMessage('')
            setAlertType('')
        }
            , 3000)
    }
    const HandleNavigate = () => {
        navigation('/signup')
    }
    const HandleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!userName || !password) {
                setAlertMessage("Please enter User anme/Password")
                setAlertType('error')
                handleAlertTimer()
                return false
            }
            else {
                const response = await axios.post('http://localhost:8000/signin/', {
                    username: userName,
                    password: password
                },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    })
                if (response.status === 200) {
                    console.log(response.data.jwt)
                    localStorage.setItem('token', response.data.jwt)
                    login()
                    navigation('/')
                }
                
            }

        } catch (error) {
            setAlertMessage('Error : please verify your credientials - ', error.response ? error.response.data : error.message)
            setAlertType('error')
            handleAlertTimer()
        }
    }
    return (
        <div className="main-signin">
            <div className="header-container">
                <p className='title'>Budget Buddy</p>
                <p className='slogon'> Chart Your Finances with Budget Buddy</p>
            </div>
            <form onSubmit={HandleSubmit}>

                <h3 className="h3 mb-3 fw-normal">Please sign in</h3>

                <div className="form-floating">
                    {/* <label htmlFor="floatingInput">User Name</label> */}
                    <input type="text" className="form-control" id="floatingInput" placeholder="User Name" onChange={e => setUserName(e.target.value)} />

                </div>
                <div className="form-floating">
                    {/* <label htmlFor="floatingPassword">Password</label> */}
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />

                </div>

                <button className="btn btn-primary w-100 py-2" type="submit" onClick={HandleNavigate}>Sign in</button><br></br><br />
                <button className="btn btn-primary sign-up w-100 py-2" type="button" onClick={() => navigation('/signup')}>Sign Up</button>
                <div className="alert-container">
                    {alertMessage && (
                        <div className={`alert ${alertType === 'success' ? 'alert-success' : 'alert-error'}`}>
                            {alertMessage}
                        </div>
                    )}
                </div>
            </form>

            <div className="footer-container">
                <p className="mt-5 mb-3 text-body-secondary"> Denesh Anandathasan &copy; 2024 </p>
            </div>
        </div>
    )
}