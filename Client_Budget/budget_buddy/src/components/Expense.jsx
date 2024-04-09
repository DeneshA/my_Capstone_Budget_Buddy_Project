
// import axios from "axios";
// import { useState, useEffect } from "react";
// import '../styles/Template.css'



// const BASE_URL = (component, value) => { return `http://localhost:8000/${component}/${value}/` }

export default function Expense() {

    // const [expenseID, setExpenseID] = useState('')
    // const [userID, setUserID] = useState('')
    // const [categoryID, setCategoryID] = useState('')
    // const [duration, setDuration] = useState('')
    // const [durationTerms, setDurationTerms] = useState('')
    // const [startDate, setStartDate] = useState('')
    // const [endDate, setEndDate] = useState('')
    // const [billDate, setBillDate] = useState('')
    // const [billAmount, setBillAmount] = useState('')
    // const [billCycle, setBillCycle] = useState('')
    // const [note, setNote] = useState('')


    // const [expenselist, setExpenseList] = useState([])
    // const [categoryList, setCategoryList] = useState([])



    // const [alertMessage, setAlertMessage] = useState('')
    // const [alertType, setAlertType] = useState('')

    
    // const handleAlertTimer = () => {
    //     setTimeout(() => {
    //         setAlertMessage('')
    //         setAlertType('')
    //     }
    //         , 3000)
    // }

    // const fetchCategoryList = () => {
    //     axios.get('http://localhost:8000/category/')
    //         .then(response => {
    //             setCategoryList(response.data)
    //             // console.log("Category",response.data)           
    //         })
    //         .catch(error => {
    //             setAlertMessage("Error Unable to fetch category records : " + (error.response ? error.response.data : error.message))
    //             setAlertType("error")
    //             handleAlertTimer()
    //         })
    // }

    useEffect(() => {
        axios.get('http://localhost:8000/expense/')
            .then(response => {
                setExpenseList(response.data)
                // console.log("Expense list",expenselist)
            })
            .catch(error => {

                console.error("Error Unable to fetch records : ", error.response ? error.response.data : error.message)
            })

        //   setUserID(1)
        setUserID(`http://localhost:8000/users/${2}/`)
        // fetchData()
        fetchCategoryList()
        // fetchExistingIncomeData(incomeID)
        // console.log(incomeID)

    }, [])

    useEffect(() => {
        // setUserID(`http://localhost:8000/users/${2}/`)
        // Only convert budget when incomeList is updated and not empty
        if (expenselist.length > 0) {
            const newData = expenselist.map(expense => {
                let value
                console.log(expense.user_id)
                if (expense.user_id === userID) {

                    switch (expense.bill_cycle) {
                        case "Annually":
                            value = expense.bill_amount / 12

                            break
                        case "Bi-Weekly":
                            value = expense.bill_amount * 2
                            break
                        case "Weekly":
                            value = expense.bill_amount * 4
                            break
                        case "Daily":
                            value = expense.bill_amount * 30
                            break
                        case "Monthly":
                        default:
                            value = expense.bill_amount
                    }
                    return { name: expense.category_name, value }
                }
            })
            setData(newData)
        }
    }, [expenselist])


    // const handelClear = () => {
    //     setCategoryID('')
    //     setDuration('')
    //     setDurationTerms('')
    //     setStartDate('')
    //     setEndDate('')
    //     setBillDate('')
    //     setBillAmount('')
    //     setBillCycle('')
    //     setNote('')
    // }

    // const handelSubmit = async (e) => {

    //     e.preventDefault()
    //     if (durationTerms === 'None') {
    //         setAlertMessage('Select a duration terms')
    //         setAlertType('error')
    //     } else if (billCycle === 'None') {
    //         setAlertMessage('Select a bill cycle')
    //         setAlertType('error')
    //     }
    //     try {
    //         const response = await axios.post('http://localhost:8000/expense/',
    //             {
    //                 user_id: BASE_URL('users', userID),
    //                 category_id: BASE_URL('category', categoryID),
    //                 duration: duration,
    //                 duration_terms: durationTerms,
    //                 start_date: startDate,
    //                 end_date: endDate,
    //                 bill_date: billDate,
    //                 bill_amount: billAmount,
    //                 bill_cycle: billCycle,
    //                 note: note
    //             }, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         })
    //         if (response.data) {
    //             // console.log(response.data)
    //             setAlertMessage('Expense successfully Saved')
    //             setAlertType('success')
    //             // fetchData()
    //             handelClear()
    //         } else {
    //             setAlertMessage('Unable to save Expense')
    //             setAlertType('error')
    //         }

    //         // console.log(response.data)
    //     } catch (error) {
    //         console.error('There was an error!', error.response ? error.response.data : error.message)
    //         setAlertMessage('Unable to process save operation')
    //         setAlertType('error')
    //     }
    //     handleAlertTimer()
    // }

    return (<h1>test</h1>
        // <div className="main-container">
        //     <div className="chart-container">
               
        //     </div>
        //     <div className="expense-container detail-container">
        //         <h3>SETUP EXPENSE</h3>
        //         <form onSubmit={handelSubmit}>
        //             <div className="float-containers">
        //                 <label htmlFor="Category Name">Category Name</label><br />
        //                 <select name="category_name"
        //                     id="category_name"
        //                     value={categoryID}
        //                     onChange={e => setCategoryID(e.target.value)}>
        //                     {categoryList.map((category, index) => (
        //                         (category.category_type === "Expense" ?
        //                             <option key={index} value={category.id}>{category.category_name}</option> :
        //                             '')
        //                     ))}
        //                 </select>
        //             </div>
        //             <div className="float-container">
        //                 <label htmlFor="Duration">Duration</label>
        //                 <input type="text"
        //                     placeholder="Duration"
        //                     id="duration"
        //                     required
        //                     value={duration}
        //                     onChange={e => setDuration(e.target.value)}
        //                 />
        //             </div>
        //             <div className="float-container">
        //                 <label htmlFor="Duration">Duration Terms</label>
        //                 <select name="duration_terms"
        //                     id="duration_terms"
        //                     value={durationTerms}
        //                     onChange={e => setDurationTerms(e.target.value)}>
        //                     <option value="None">None</option>
        //                     <option value="Month">Month</option>
        //                     <option value="Year">Year</option>
        //                 </select>
        //             </div>

        //             <div className="float-container">
        //                 <label htmlFor="startDate">Start Date</label>
        //                 <input type="date"
        //                     id="startDate"
        //                     value={startDate}
        //                     onChange={e => setStartDate(e.target.value)}
        //                 />
        //             </div>
        //             <div className="float-container">
        //                 <label htmlFor="endDate">End Date</label>
        //                 <input type="date"
        //                     id="endDate"
        //                     value={endDate}
        //                     onChange={e => setEndDate(e.target.value)}
        //                 />
        //             </div>
        //             <div className="float-container">
        //                 <label htmlFor="bill_Date">Bill Date</label>
        //                 <input type="date"
        //                     id="billDate"
        //                     value={billDate}
        //                     onChange={e => setBillDate(e.target.value)}
        //                 />
        //             </div>
        //             <div className="float-container">
        //                 <label htmlFor="bill_amount">Bill Amount</label>
        //                 <input type="text"
        //                     placeholder="Bill Amount"
        //                     id="bill_amount"
        //                     required
        //                     value={billAmount}
        //                     onChange={e => setBillAmount(e.target.value)}
        //                 />
        //             </div>
        //             <div className="float-container">
        //                 <label htmlFor="bill_cycle">Bill Cycle</label>
        //                 <select name="bill_cycle"
        //                     id="bill_cycle"
        //                     required
        //                     value={billCycle}
        //                     onChange={e => setBillCycle(e.target.value)} >
        //                     <option value="None">None</option>
        //                     <option value="Daily">Daily</option>
        //                     <option value="Weekly">Weekly</option>
        //                     <option value="Bi-Weekly">Bi-Weekly</option>
        //                     <option value="Monthly">Monthly</option>
        //                     <option value="Annually">Annually</option>
        //                 </select>
        //             </div>
        //             <div className="float-container">
        //                 <label htmlFor="note">Note</label>
        //                 <input type="text"
        //                     placeholder="Note"
        //                     id="note"
        //                     value={note}
        //                     onChange={e => setNote(e.target.value)}
        //                 />
        //             </div><br />
        //             <div className="float-container btn-container">

        //                 <div><button type="button" className="btn" id="clear-btn" onClick={handelClear} >CLEAR</button></div>
        //                 <div><button type="submit" className="btn" id="save-btn">SAVE</button></div>
        //                 <div><button type="button" className="btn" id="edit-btn" >EDIT</button></div>

        //                 {/* <div className="nav-income-list btn-link"><FontAwesomeIcon icon={faList} size="2xl" style={{color: "#f8f7f7",}} /><br></br><Link to='/incomelist'/>Income List</div> */}
        //             </div>

        //             <div className="alert-container">
        //                 {alertMessage && (
        //                     <div className={`alert ${alertType === 'success' ? 'alert-success' : 'alert-error'}`}>
        //                         {alertMessage}
        //                     </div>
        //                 )}
        //             </div>
        //         </form>
        //     </div>
        //     <div className="expense-list-container list-container"></div>
        // </div>

    )
}