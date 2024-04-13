import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Reminder.css'
import { useAuth } from '../context/AuthContext'
import { jwtDecode } from "jwt-decode"

export default function Reminder() {

    const [reminders, setReminders] = useState([])

    const {setPageTitle} = useAuth()
    const [userID,setUserID] = useState('')
    const [events,setEvents] =useState([])
    const [isEvent,setIsEvent] = useState('')
   
    useEffect(() => {

        const token = localStorage.getItem('token')
        const tokenDecoded = jwtDecode(token)
        setUserID(tokenDecoded.id)
        setPageTitle("REMINDER")

        if (isEvent === 'Income')
        {
            fetch(`http://localhost:8000/income/`)
            .then(response => response.json())
            .then(data => {            
                const formattedReminders = data.map(item => 
                    (  {                       
                            title: item.category_name,
                            start: item.start_date,
                            end: item.end_Date,                                           
                }))
                setReminders(formattedReminders)
            })
            .catch(error => {
                console.error('Error fetching events:', error)
            })    
        }
        else{
        // const userId = localStorage.getItem('userId')
        fetch(`http://localhost:8000/expense/`)
            .then(response => response.json())
            .then(data => {            
                const formattedReminders = data.map(item => 
                    (  {                       
                            title: item.category_name,
                            start: item.bill_date,
                            end: item.end_Date,                                           
                }))
                setReminders(formattedReminders)
            })
            .catch(error => {
                console.error('Error fetching events:', error)
            })    
        }
        // const fetchData = async () => {
        //     try {
        //         // Fetch Expenses
        //         const responseExp = await axios.get('http://localhost:8000/expense/')
        //         const filteredExpenses = responseExp.data.filter(exp => {
        //             const urlSegments = exp.user_id.split('/')
        //             const expUserID = urlSegments[urlSegments.length - 2]
        //             return expUserID == userID
        //         })
    
        //         // Fetch Incomes
        //         const responseInc = await axios.get('http://localhost:8000/income/')
        //         const filteredIncomes = responseInc.data.filter(inc => {
        //             const urlSegments = inc.user_id.split('/')
        //             const incUserID = urlSegments[urlSegments.length - 2]
        //             return incUserID == userID
        //         })
    
        //         // Combine filteredExpenses and filteredIncomes together
        //         const combinedFinancialRecords = [...filteredExpenses, ...filteredIncomes]
    
  
        //         setEvents(combinedFinancialRecords)
        //     } catch (error) {
        //         console.error("Error Unable to fetch records: ", error)
        //         setAlertMessage(`Error Unable to fetch records: ${error.response ? error.response.data : error.message}`)
        //         setAlertType("error")
        //     }
        // }
    
        // fetchData()
    }, [isEvent]);

        return (
            <div className="reminder-container">
                <div className='main'>
                    <label htmlFor="event-type">Event Type : </label>
                    <select className="event-type" id="event_type" value={isEvent} onChange={(e) => setIsEvent(e.target.value)}>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div><br />
                <div className='calender'>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    footerToolbar={{
                        center: "dayGridMonth, timeGridWeek, timeGridDay"
                    }}
                    height="520px"
                    events={reminders}
                />
                </div>
                
            </div>
        )
    }

   
