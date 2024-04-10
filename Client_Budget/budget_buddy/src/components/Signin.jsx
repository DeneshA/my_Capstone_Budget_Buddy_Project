import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signin() {
    const navigation = useNavigate()

    const { login } = useAuth()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const HandleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8000/signin/', {
                username: userName,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                login()
                navigation('/')
            }
        } catch (error) {
            console.error('Error during sign in:', error.response ? error.response.data : error.message);

        }
    }
    return (
        <div className="main-signin">
            <div className="header-container">
                <p className='title'>Budget Buddy</p>
                <p className='slogon'> Chart Your Finances with Budget Buddy</p>
            </div>
            <form onSubmit={HandleSubmit}>

                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <label htmlFor="floatingInput">User Name</label>
                    <input type="text" className="form-control" id="floatingInput" placeholder="User Name" onChange={e => setUserName(e.target.value)} />

                </div>
                <div className="form-floating">
                    <label htmlFor="floatingPassword">Password</label>
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />

                </div>

                <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button><br></br><br />
                <button className="btn btn-primary sign-up w-100 py-2" type="button" onClick={() => navigation('/signup')}>Sign Up</button>

            </form>

            <div className="footer-container">
                <p className="mt-5 mb-3 text-body-secondary">&copy; 2024</p>
            </div>
        </div>
    )
}