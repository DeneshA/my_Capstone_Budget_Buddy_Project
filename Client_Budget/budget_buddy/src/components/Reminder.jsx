import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Reminder.css'
import { useAuth } from '../context/AuthContext'


export default function Reminder() {

    const [reminders, setReminders] = useState([])

    const {setPageTitle} = useAuth()
   
    useEffect(() => {

        
    setPageTitle("REMINDER")
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
    }, []);

        return (
            <div className="reminder-container">
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
        )
    }

   
