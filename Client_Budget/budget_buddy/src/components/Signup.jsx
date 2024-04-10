import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup(){

    const navigation = useNavigate()

    const [userName, setUserName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const HandleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:8000/signup',{
            method: 'POST',
            headers: {
                'ContentType': 'application/json'
            },
            body: JSON.stringify({
                userName,firstName,lastName,email,password

            })
        })
        const content = await response.json()
        console.log(content)
    }


    return(
        <div className="signup-container">
             <form onSubmit={HandleSubmit}>
          {/* <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" /> */}
          <h1 className="h3 mb-3 fw-normal">Register</h1>
          <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput" placeholder="User Name" onChange={e => setUserName(e.target.value)}/>
            <label htmlFor="floatingInput">User Name</label>
          </div>

          <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput" placeholder="First Name" onChange={e => setFirstName(e.target.value)}/>
            <label htmlFor="floatingInput">First Name</label>
          </div>

          <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput" placeholder="Last Name" onChange={e => setLastName(e.target.value)}/>
            <label htmlFor="floatingInput">Last Name</label>
          </div>

          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value) }/>
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}/>
            <label htmlFor="floatingPassword">Confirm Password</label>
          </div>          
          <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button><br></br><br />
          <button className="btn btn-primary sign-up w-100 py-2" type="button">Sign Up</button>
          
        </form>
        </div>
    )
}