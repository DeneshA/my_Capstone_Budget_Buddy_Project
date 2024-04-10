import React,{useState,useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { jwtDecode } from "jwt-decode"
import '../styles/SlideMenu.css'

export default function SlideMenu() {
    const navigation = useNavigate()

    const { logout, setUserID } = useAuth()

    // const [userId, setUserID] = useState('')
    const [userName, setUserName] = useState('')
    const [userFirstName, setFirstUser] = useState('')




    const [isSlideMenuOpen, setIsSlideMenuOpen] = useState(false)
    
    const toogleMenu = () => setIsSlideMenuOpen(!isSlideMenuOpen)
    const closeMenu = () => setIsSlideMenuOpen(false)

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest('.curtain-menu') && isSlideMenuOpen) {
                setIsSlideMenuOpen(false)
            }
        }

        if (isSlideMenuOpen) {
            document.addEventListener('click', handleOutsideClick)
        }

        return () => document.removeEventListener('click', handleOutsideClick)
    }, [isSlideMenuOpen]) 

   

    useEffect(()=> {
        const fetchActiveUserDetails = async () => {
            const token = localStorage.getItem('token')
            console.log("Token -",token)
            const tokenDecoded = jwtDecode(token)
            console.log(tokenDecoded)
          
            setUserID(tokenDecoded.id)
            setUserName(tokenDecoded.username)
            setFirstUser(tokenDecoded.first_name)           
        }
            fetchActiveUserDetails()
    },[setUserID])


    const HandleSignout = async (e) => {
        e.preventDefault()
      
    try {
        await axios.post('http://localhost:8000/signout/', {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        
    } catch (error) {
        console.error('Error during sign out:', error)
    }
    
    localStorage.removeItem('token') 
    logout()
    navigation('/signin')
    }

    return (
        <nav className="navbar">
            <button className="menu-button" onClick={toogleMenu}>
                &#9776; {/* Hamburger menu icon */}
            </button>
            <div className={`curtain-menu ${isSlideMenuOpen ? 'open':''}`}>
                <button className='close-menu' onClick={closeMenu}>&times;</button>
                <a href="#">INCOME</a>
                <a href="#">EXPENSE</a>
                <a href="#">GOAL PLANER</a>
                <a href="#">CATEGORY</a>
                <a href="#">REMINDER</a>
            </div>

            <div className="user-section">
                <span className="user-name">{`Welcome ! ${userFirstName}`}</span>
                <a href="/"  className="logout-link" onClick={HandleSignout}>Logout</a>
            </div>
        </nav>
    )
}