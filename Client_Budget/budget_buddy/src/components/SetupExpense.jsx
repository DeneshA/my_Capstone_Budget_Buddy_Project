import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

import '../styles/Income.css'


// const BASE_URL = process.env.REACT__APP_BASE_URL
// console.log(BASE_URL)
const BASE_URL = (component,value) => { return `http://localhost:8000/${component}/${value}/` }
// console.log(BASE_URL('users',12))

export default function SetupExpense(){

    const [expenseID, setExpenseID] = useState('')
    const [userID, setUserID] = useState('')
    const [categoryID, setCategoryID] = useState('')
    const [duration, setDuration] = useState('')
    const [durationTerms, setDurationTerms] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [billDate, setBillDate] = useState('')
    const [billAmount, setBillAmount] = useState('')
    const [billCycle, setBillCycle] = useState('')
    const [note, setNote] = useState('')

    const [expenselist, setExpenseList] = useState([])
    const [categoryList,setCategoryList] = useState([])

    const [alertMessage,setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState('')

    // const [paramID,setParamID] = useState('')
    let {expenseId} = useParams()
    console.log("expense Id  is ",expenseId)
    const navigate = useNavigate()
    
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
                // console.log("Category",response.data)           
            })
            .catch(error => {
                setAlertMessage("Error Unable to fetch category records : " + (error.response ? error.response.data : error.message))
                setAlertType("error")
                handleAlertTimer()
            })
    }
    // const fetchData = () => {
    //     axios.get('http://localhost:8000/expense/')
    //         .then(response => {
    //             // console.log(response.data)
    //             setExpenseList(response.data)
    //             // console.log(incomelist)                
    //             handelClear()
    //             // fetchCategoryList()

    //             // /Hardcoding UserID
    //             setUserID(1)
                
    //         })
    //         .catch(error => {
    //             setAlertMessage("Error Unable to fetch expense records : " + (error.response ? error.response.data : error.message))
    //             setAlertType("error")
    //             handleAlertTimer()
    //         })
    // }

    const fetchExistingExpenseData = (expenseId) => {
  
        axios.get(`http://localhost:8000/expense/${expenseId}`)
            .then(response => {
                console.log("Fetch data ",response.data)
                const data = response.data;

                // Assuming your API always returns a URL ending with a numeric ID
                const userId = data.user_id.split('/').filter(Boolean).pop(); // '2'
                const categoryId = data.category_id.split('/').filter(Boolean).pop(); // '2'
        
                setExpenseID(data.id)
                setUserID(userId)
                setCategoryID(categoryId)
                setDuration(data.duration.toString())
                setDurationTerms(data.duration_terms)
                setStartDate(data.start_date)
                setEndDate(data.end_date || '')
                setBillDate(data.bill_date || '')
                setBillAmount(data.bill_amount.toString())
                setBillCycle(data.bill_cycle)
                setNote(data.notes || '')
                            
              
                
            })
            .catch(error => {
                setAlertMessage("Error Unable to fetch expense records : " + (error.response ? error.response.data : error.message))
                setAlertType("error")
                handleAlertTimer()
            })
    }


    useEffect(() => {
        // console.log(incomeID)
       
        // fetchData()
        fetchCategoryList()
        fetchExistingExpenseData(expenseId)
        // console.log(incomeID)

        

    },[expenseId])

    const handelClear = () => {
        setCategoryID('')
        setDuration('')
        setDurationTerms('')
        setStartDate('')
        setEndDate('')
        setBillDate('')
        setBillAmount('')
        setBillCycle('')
        setNote('')
    }

    const formatDate = (date) => {
        const d = new Date(date)
        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear()
    
        if (month.length < 2) 
            month = '0' + month
        if (day.length < 2) 
            day = '0' + day
    
        return [year, month, day].join('-')
    };
    
    
 

    const handelSubmit = async (e) => {

        e.preventDefault()
        if(durationTerms ==='None'){
            setAlertMessage('Select a duration terms')
            setAlertType('error')            
        } else if(billCycle === 'None'){
            setAlertMessage('Select a bill cycle')
            setAlertType('error')
        }
        try{
            if(expenseID){        
                const responseEdit = await axios.put(`http://localhost:8000/expense/${expenseID}/`,
                {
                    user_id: BASE_URL('users',userID),
                    category_id: BASE_URL('category',categoryID),
                    duration : duration,
                    duration_terms : durationTerms,
                    start_date : startDate ? formatDate(startDate) : '',
                    end_date : endDate ? formatDate(endDate) : '',
                    bill_date : endDate ? formatDate(billDate) : '',
                    bill_amount : billAmount,
                    bill_cycle : billCycle,
                    notes : note
                }, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                })
                if (responseEdit.data) {
                    // console.log(response.data)
                    setAlertMessage('Expense successfully Edited')
                    setAlertType('success')
                    // fetchData()
                    handelClear()
                } else {                
                    setAlertMessage('Unable to edit Expense')
                    setAlertType('error')
                }
            }
            else{
            const response = await axios.post('http://localhost:8000/expense/',
                {
                    user_id: BASE_URL('users', userID),
                    category_id: BASE_URL('category', categoryID),
                    duration: duration,
                    duration_terms: durationTerms,
                    start_date: startDate,
                    end_date: endDate,
                    bill_date: billDate,
                    bill_amount: billAmount,
                    bill_cycle: billCycle,
                    notes: note
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
            })
            if (response.data) {
                // console.log(response.data)
                setAlertMessage('Expense successfully Saved')
                setAlertType('success')
                fetchData()
                handelClear()
            } else {                
                setAlertMessage('Unable to save Expense')
                setAlertType('error')
            }
            }
            // console.log(response.data)
        } catch (error) {
            console.error('There was an error!', error.response ? error.response.data : error.message)
            setAlertMessage('Unable to process save/edit operation')
            setAlertType('error')
        }
    
        handleAlertTimer()
    }

    const handleNavigation = (e) => {
        e.preventDefault()
        if(e.target.value === 'list')
            { navigate('/expenselist')}
        else {
            navigate('/expensechart')
        }
    }

    return(
        <div className="main-container">
            <div className="chart-container"></div>
            <div className="expense-container">
                {/* <h3>SETUP EXPENSE</h3> */}
                <form onSubmit={handelSubmit}>
                    <div className="float-containers">
                        <label  htmlFor="Category Name">Category Name</label><br />
                        <select name="category_name"
                                id="category_name"
                                value={categoryID}
                                onChange={e => setCategoryID(e.target.value)}>
                                    {categoryList.map((category,index) => (
                                        (category.category_type === "Expense" ? 
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
                        <label htmlFor="bill_Date">Bill Date</label>
                        <input type="date"
                            id="billDate"
                            value={billDate}
                            onChange={e => setBillDate(e.target.value)}
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
                    <div className="float-container btn-container">
                        <div><button type="button" className="btn" id="expense-chart-btn" value={'chart'} onClick={handleNavigation}>Chart</button></div>
                    <div><button type="button" className="btn" id="clear-btn" onClick={handelClear} >CLEAR</button></div>
                    <div><button type="submit" className="btn" id="save-btn">SAVE</button></div>
                    <div><button type="button" className="btn" id="edit-btn" onClick={handelSubmit}>EDIT</button></div>
                    <div><button type="button" className="btn" id="expense-list-btn" value={'list'} onClick={handleNavigation}>List</button></div>
                        {/* <div className="nav-expense-list btn-link"><FontAwesomeIcon icon={faList} size="2xl" style={{color: "#f8f7f7",}} /><br></br><Link to='/expenselist'/>expense List</div> */}
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