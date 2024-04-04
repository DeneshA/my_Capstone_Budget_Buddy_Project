import axios from "axios";
import { useState,useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function Income(){
    
    const [userID,setUserID] = useState('')
    const [categoryID,setCategoryID]= useState('')
    const [duration,setDuration] = useState('')
    const [durationTerms,setDurationTerms] = useState('')
    const [startDate,setStartDate] = useState('')
    const [EndDate,setEndDate] = useState('')
    const [billAmount,setBillAmount] = useState('')
    const [billCycle,setBillCycle] = useState('')
    const [note,setNote] = useState('')

    const [incomelist, setIncomeList] = useState([])

    const [alertMessage,setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState('')

     
    //Setting timeout to clear the Alert MSG
    const handleAlertTimer = () => {
        setTimeout( () => {
            setAlertMessage('') 
            setAlertType('')}
                ,3000)
    }

    const fetchData = () => {
        axios.get('http://localhost:8000/income/')
            .then(response => {
                console.log(response.data)
                setIncomeList(response.data)
                console.log(incomelist)                
                handleClear()
                
            })
            .catch(error => {
                setAlertMessage("Error Unable to fetch records : " + (error.response ? error.response.data : error.message))
                setAlertType("error")
                handleAlertTimer()
            })
    }
    useEffect(() => {
        fetchData()
    },[])

    return(
        <div className="income-container">

        </div>
    )

}