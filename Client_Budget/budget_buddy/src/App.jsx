import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  // const BASE_URL = process.env.REACT__APP_BASE_URL
  // console.log(BASE_URL)
  return (
    < div className='App-container'>
     
      {/* <login>{ ?  <Main /> :  }</lonign> */}
      <div className='main-wrap-container'>
      <Main />
      </div>
      
     
    </div>
  )
}

export default App
