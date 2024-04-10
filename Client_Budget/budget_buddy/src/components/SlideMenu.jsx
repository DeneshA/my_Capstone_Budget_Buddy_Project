import React,{useState,useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import '../styles/SlideMenu.css'

export default function SlideMenu() {
    const navigation = useNavigate()

    const { logout } = useAuth()

    const [userName, setUserName] = useState('')



    const [isSlideMenuOpen, setIsSlideMenuOpen] = useState(false)
    
    const toogleMenu = () => setIsSlideMenuOpen(!isSlideMenuOpen)
    const closeMenu = () => setIsSlideMenuOpen(false)

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest('.curtain-menu') && isSlideMenuOpen) {
                setIsSlideMenuOpen(false); // Close the menu if click outside
            }
        };

        if (isSlideMenuOpen) {
            document.addEventListener('click', handleOutsideClick)
        }

        return () => document.removeEventListener('click', handleOutsideClick)
    }, [isSlideMenuOpen]) // Effect runs on menu state change

   

    useEffect(()=> {
        const fetchActiveUserDetails = async () => {
            const token = localStorage.getItem('token')
            if (token){
                try {
                    const response = await axios.get('http://localhost:8000/users/',{
                        headers:{
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    if(response.status === 200) {
                        console.log(response.data)
                        setUserName(response.data.first_name)

                    }}
                catch(error){
                        console.log('Error fetching user details:', error)
                    }
                
            }}
            fetchActiveUserDetails()
    },[userName])


    const HandleSignout = async (e) => {
        e.preventDefault()
       // Optional: Invalidate the token on the backend
    try {
        await axios.post('http://localhost:8000/signout/', {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        // If the backend call is optional or successful, proceed with logout
    } catch (error) {
        console.error('Error during sign out:', error)
    }
    
    localStorage.removeItem('token') // Remove the token from local storage
    logout(); // Update your AuthContext state to reflect the logout
    navigation('/signin') // Redirect to the sign-in page
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
                <span className="user-name">{`WelCome ! ${userName}`}</span>
                <a href="/"  className="logout-link" onClick={HandleSignout}>Logout</a>
            </div>
        </nav>
    )
}