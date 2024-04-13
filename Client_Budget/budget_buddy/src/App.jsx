import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Signin from './components/Signin'
import { useAuth } from './context/AuthContext'

import './App.css'

function App() {

  const { isLoggedIn } = useAuth()


  return (
    < div className='App-container'>
      {!isLoggedIn ?
         (<Signin />) : 
         <>
          <Header />

          <div className='main-wrap-container'>
            <Main />
          </div>

          <Footer />
        </>
       }  

    </div>
  )
}

export default App
