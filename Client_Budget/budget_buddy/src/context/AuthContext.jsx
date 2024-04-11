import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId,setUserId] =useState('')
  const [comTitle,setComTitle] =useState('')

  const login = () => setIsLoggedIn(true)
  const logout = () =>{ 
    setIsLoggedIn(false) 
    setUserId('')}

    // Set up a function to access from slidemenu to push user id to store in context
    const setUserID = (id) => {
      setUserId(id)
    }

    const setPageTitle =(title) => {
        setComTitle(title)
    }
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId, setUserID , comTitle,setPageTitle }}>
      {children}
    </AuthContext.Provider>
  )
}