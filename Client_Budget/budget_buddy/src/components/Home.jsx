
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
export default function Home (){
    const {setPageTitle} = useAuth()
    useEffect(() => {
        setPageTitle("")
           
        },[])

    return(
       <div>
         <h3>Welcome to Budget Buddy, your partner in budgeting</h3>
        
       </div>
    )
}