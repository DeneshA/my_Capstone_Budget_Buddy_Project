import axios from "axios"
import React, { useState, useEffect } from "react"
import { useNavigate , Link} from 'react-router-dom'
import { jwtDecode } from "jwt-decode"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../context/AuthContext'

import '../styles/Income.css'

export default function ExpenseList() {

    const navigate = useNavigate()

    const [expenseList, setExpenseList] = useState([])
    const [alertMessage, setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState('')
    const [userID,setUserID] = useState('')
   
    const {setPageTitle} = useAuth()


    //Setting timeout to clear the Alert MSG
    const handleAlertTimer = () => {
        setTimeout(() => {
            setAlertMessage('')
            setAlertType('')
        }
            , 3000)
    }

     useEffect(() => {
      
        
        setPageTitle("EXPENSE LIST")
        const token = localStorage.getItem('token')
        const tokenDecoded = jwtDecode(token)
        setUserID(tokenDecoded.id)
        const fetchExpenseList = async () => {
            await axios.get('http://localhost:8000/expense/')
                .then(response => {
                   
                    setExpenseList(response.data)
                 
                })
                .catch(error => {
                    setAlertMessage("Error Unable to fetch records : " + (error.response ? error.response.data : error.message))
                    setAlertType("error")
                })
        }
        fetchExpenseList()

    }, [expenseList])

    const handleUpdate = (expenseId) => {
        // console.log("Pick ",expenseId)
        navigate(`/setupexpense/${expenseId}`)
        // navigate(`/income/${incomeId}`)
    }

    const handleDelete = (expenseId) => {
        // have change from Category to Income
        axios.delete(`http://localhost:8000/expense/${expenseId}/`) 
            .then(() => {
                //Removing Income record which was deleted 
                const updateExpenseList = expenseList.filter(expense => expense.id !== expenseId)
                setExpenseList(updateExpenseList)
                setAlertMessage('Expense deleted successfully')
                setAlertType('success')
                // fetchInData()
            })
            .catch(error => {
                console.error("Error deleting the expense : ", error.response ? error.response.data : error.message)
                setAlertMessage('Failed to detele expense !')
                setAlertType('error')
            })
        handleAlertTimer()
    }

    const handleNavigation = (e) => {
        e.preventDefault()
        if(e.target.value === 'chart')
            { navigate('/expensechart')}
        else {
            navigate('/setupexpense')
        }
    }

    return (
        <div className="expense-container">
            {/* <h1>Iam expense List</h1> */}
            
            <div className="list-display">
                <table className="table-list">
                    <thead>
                        <tr>
                            <th>CATEGORY</th>
                            <th>DURATION</th>
                            <th>TERMS</th>
                            <th>START DATE</th>
                            <th>END DATE</th>
                            <th>BILL DATE</th>
                            <th>BILL AMOUNT</th>
                            <th>Bill CYCLE</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            expenseList.map((expense, index) => (
                                <tr key={index}>
                                    {/* {console.log(expense.duration)} */}
                                    <td>{expense.category_name}</td>
                                    <td>{expense.duration}</td>
                                    <td>{expense.duration_terms}</td>
                                    <td>{expense.start_date}</td>
                                    <td>{expense.end_date || 'N/A'}</td>
                                    <td>{expense.bill_date || 'N/A'}</td>
                                    <td>{expense.bill_amount}</td>
                                    <td>{expense.bill_cycle}</td>
                                    <td>
                                        <div className="modify-btn">
                                            <div className="delete-category" onClick={() => handleDelete(expense.id)}><FontAwesomeIcon icon={faTrashCan} /></div>
                                            {/* <div className="edit-category" onClick={() => handleUpdate(income.id)}><FontAwesomeIcon icon={faPenSquare} /></div> */}
                                            <Link to={`/setupexpense/${expense.id}`}><FontAwesomeIcon icon={faPenSquare} /></Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="buttons-container">
            <button type="button" className="btn" id="expense-list-btn" value={'chart'} onClick={handleNavigation}>Chart</button>
            <button type="button" className="btn" id="setup-expense" value={'setup'} onClick={handleNavigation}>Setup</button>
    
            </div>
            </div>
        </div>
    )
}