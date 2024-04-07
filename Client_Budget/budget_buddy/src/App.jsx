import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Signin from './components/Signin'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  // const BASE_URL = process.env.REACT__APP_BASE_URL
  // console.log(BASE_URL)

   // State to track if the user is logged in
   const [isLoggedIn, setIsLoggedIn] = useState(false)

   const handleLoginSuccess = () => {
     setIsLoggedIn(true);
   }

  //  // If the user is not logged in, show the Login component
  // if (!isLoggedIn) {
  //   return <Signin onLoginSuccess={handleLoginSuccess} />
  // }


  return (
    < div className='App-container'>
      <Header />
     
      <div className='main-wrap-container'>
      <Main />
      </div>
      
      <Footer />
    </div>
  )
}

export default App
