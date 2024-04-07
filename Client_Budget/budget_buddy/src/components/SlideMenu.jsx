import React,{useState,useEffect} from 'react'
import '../styles/SlideMenu.css'

export default function SlideMenu() {
    
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
                <span className="user-name">{'userName'}</span>
                <a href="/"  className="logout-link">Logout</a>
            </div>
        </nav>
    )
}