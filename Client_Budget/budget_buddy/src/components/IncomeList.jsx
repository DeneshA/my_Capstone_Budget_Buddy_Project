import axios from "axios"
import React, { useState, useEffect } from "react"
import { useNavigate , Link} from 'react-router-dom'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';

import '../styles/Income.css'

export default function IncomeList() {

    const navigate = useNavigate()

    const [incomeList, setIncomeList] = useState([])
    const [alertMessage, setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState('')


    //Setting timeout to clear the Alert MSG
    const handleAlertTimer = () => {
        setTimeout(() => {
            setAlertMessage('')
            setAlertType('')
        }
            , 3000)
    }

     useEffect(() => {

        const fetchIncomeList = async () => {
            await axios.get('http://localhost:8000/income/')
                .then(response => {
                    // console.log("tttttt", response.data)
                    setIncomeList(response.data)
                    // console.log("Income Test ", incomeList)
                })
                .catch(error => {
                    setAlertMessage("Error Unable to fetch records : " + (error.response ? error.response.data : error.message))
                    setAlertType("error")
                })
        }
        fetchIncomeList()

    }, [incomeList])

    const handleUpdate = (incomeId) => {
        console.log("Pick ",incomeId)
        navigate(`/setupincome/${incomeId}`)
        // navigate(`/income/${incomeId}`)
    }

    const handleDelete = (incomeId) => {
        // have change from Category to Income
        axios.delete(`http://localhost:8000/income/${incomeId}/`) 
            .then(() => {
                //Removing Income record which was deleted 
                const updateIncomeList = incomeList.filter(income => income.id !== incomeId)
                setIncomeList(updateIncomeList)
                setAlertMessage('Income deleted successfully')
                setAlertType('success')
                // fetchInData()
            })
            .catch(error => {
                console.error("Error deleting the category : ", error.response ? error.response.data : error.message)
                setAlertMessage('Failed to detele category !')
                setAlertType('error')
            })
        handleAlertTimer()
    }

    const handleNavigation = (e) => {
        e.preventDefault()
        if(e.target.value === 'chart')
            { navigate('/incomechart')}
        else {
            navigate('/setupincome')
        }
    }

    return (
        <div className="income-container">
            {/* <h1>Iam Income List</h1> */}
            
            <div className="list-display">
                <table className="table-list">
                    <thead>
                        <tr>
                            <th>CATEGORY</th>
                            <th>DURATION</th>
                            <th>TERMS</th>
                            <th>START DATE</th>
                            <th>END DATE</th>
                            <th>BILL AMOUNT</th>
                            <th>Bill CYCLE</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            incomeList.map((income, index) => (
                                <tr key={index}>
                                    {/* {console.log(income.duration)} */}
                                    <td>{income.category_name}</td>
                                    <td>{income.duration}</td>
                                    <td>{income.duration_terms}</td>
                                    <td>{income.start_date}</td>
                                    <td>{income.end_date || 'N/A'}</td>
                                    <td>{income.bill_amount}</td>
                                    <td>{income.bill_cycle}</td>
                                    <td>
                                        <div className="modify-btn">
                                            <div className="delete-category" onClick={() => handleDelete(income.id)}><FontAwesomeIcon icon={faTrashCan} /></div>
                                            {/* <div className="edit-category" onClick={() => handleUpdate(income.id)}><FontAwesomeIcon icon={faPenSquare} /></div> */}
                                            <Link to={`/setupincome/${income.id}`}><FontAwesomeIcon icon={faPenSquare} /></Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="buttons-container">
            <button type="button" className="btn" id="income-list-btn" value={'chart'} onClick={handleNavigation}>Chart</button>
            <button type="button" className="btn" id="setup-income" value={'setup'} onClick={handleNavigation}>Setup</button>
    
            </div>
            </div>
        </div>
    )
}