import axios from "axios";
import { useState,useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import '../styles/Income.css'

export default function Income(){
    const [incomeID,setIncomeID] = useState('')
    const [userID,setUserID] = useState('')
    const [categoryID,setCategoryID]= useState('')
    const [duration,setDuration] = useState('')
    const [durationTerms,setDurationTerms] = useState('')
    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')
    const [billAmount,setBillAmount] = useState('')
    const [billCycle,setBillCycle] = useState('')
    const [note,setNote] = useState('')

    const [incomelist, setIncomeList] = useState([])
    const [categoryList,setCategoryList] = useState([])

    const [alertMessage,setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState('')

     
    //Setting timeout to clear the Alert MSG
    const handleAlertTimer = () => {
        setTimeout( () => {
            setAlertMessage('') 
            setAlertType('')}
                ,3000)
    }
    const fetchCategoryList = () => {
        axios.get('http://localhost:8000/category/')
            .then(response =>  {
                setCategoryList(response.data)    
                console.log("Category",response.data)           
            })
            .catch(error => {
                setAlertMessage("Error Unable to fetch category records : " + (error.response ? error.response.data : error.message))
                setAlertType("error")
                handleAlertTimer()
            })
    }
    const fetchData = () => {
        axios.get('http://localhost:8000/income/')
            .then(response => {
                console.log(response.data)
                setIncomeList(response.data)
                console.log(incomelist)                
                handleClear()
                // fetchCategoryList()

                // /Hardcoding UserID
                setUserID(1)
                
            })
            .catch(error => {
                setAlertMessage("Error Unable to fetch income records : " + (error.response ? error.response.data : error.message))
                setAlertType("error")
                handleAlertTimer()
            })
    }
    useEffect(() => {
        fetchData()
        fetchCategoryList()
    },[])

    const handelClear = () => {
        setCategoryID('')
        set
    }

// console.log("Print",categoryList)
    return(
        <div className="main-container">
            <div className="chart-container"></div>
            <div className="income-container">
                <h3>INCOME DETAILS</h3>
                <form >
                    <div className="float-containers">
                        <label  htmlFor="Category Name">Category Name</label><br />
                        <select name="category_name"
                                id="category_name"
                                value={categoryID}
                                onChange={e => setCategoryID(e.target.value)}>
                                    {categoryList.map((category,index) => (
                                        (category.category_type === "Income" ? 
                                        <option key={index} value={category.id}>{category.category_name}</option> : 
                                        '' )                                                                                
                                    ))}
                        </select>
                    </div>
                    <div className="float-container">
                       <label  htmlFor="Duration">Duration</label>
                        <input  type="text"
                                placeholder="Duration"
                                id="duration"
                                required
                                value={duration}
                                onChange={e => setDuration(e.target.value)}                        
                        />   
                    </div>                     
                    <div className="float-container">
                        <label  htmlFor="Duration">Duration Terms</label>
                        <select name="duration_terms"
                                id="duration_terms"
                                value={durationTerms}
                                onChange={e => setDurationTerms(e.target.value)}>
                                    <option value="None">None</option>
                                    <option value="Month">Month</option>
                                    <option value="Year">Year</option>
                        </select>
                    </div>
                    
                    <div className="float-container">
                        <label  htmlFor="startDate">Start Date</label>
                        <input  type="date"
                                id="startDate"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}                        
                        />   
                    </div>
                    <div className="float-container">
                        <label  htmlFor="endDate">End Date</label>
                        <input  type="date"
                                id="endDate"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}                        
                        />   
                    </div>
                    <div className="float-container">
                        <label  htmlFor="bill_amount">Bill Amount</label>
                        <input  type="text"
                                placeholder="Bill Amount"
                                id="bill_amount"
                                required
                                value={billAmount}
                                onChange={e => setBillAmount(e.target.value)}                        
                        />   
                    </div>
                    <div className="float-container">
                        <label  htmlFor="bill_cycle">Bill Cycle</label>                    
                        <select name="bill_cycle"
                                id="bill_cycle"
                                required
                                value={billCycle}
                                onChange={e => setBillCycle(e.target.value)} >
                                    <option value="None">None</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Bi-Weekly">Bi-Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Annually">Annually</option>
                        </select>
                    </div>
                    <div className="float-container">
                        <label  htmlFor="note">Note</label>
                        <input  type="text"
                                placeholder="Note"
                                id="note"
                                value={note}
                                onChange={e => setNote(e.target.value)}                        
                        />   
                    </div><br />
                    <div className="float-container">
                    <button type="button" className="btn" id="clear-btn" >CLEAR</button>
                    <button type="submit" className="btn" id="save-btn">SAVE</button>
                    <button type="button" className="btn" id="edit-btn" >EDIT</button>
                    </div>

                    <div className="alert-container">
                    {alertMessage && (
                        <div className={`alert ${alertType === 'success' ? 'alert-success' : 'alert-error'}`}>
                            {alertMessage}
                        </div>
                    )}
                </div>
                </form>
            </div>
        </div>
    )

}