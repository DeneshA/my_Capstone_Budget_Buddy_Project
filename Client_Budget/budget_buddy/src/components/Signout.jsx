import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function signout(){
    const navigation = useNavigate()

    const { login } = useAuth()

    const [userName, setUserName] = useState('')

    
    const HandleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8000/signout/', {
                username: userName,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            if (response.status === 200) {
                logout()
                navigation('/signin')
            }
        } catch (error) {
            console.error('Error during sign in:', error.response ? error.response.data : error.message);

        }
    }
    return(
        <h3>I am sign out</h3>
    )
}