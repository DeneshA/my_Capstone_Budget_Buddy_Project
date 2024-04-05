import axios from "axios"
import React,{useState,useEffect} from "react"
import '../styles/Income.css'

export default function IncomeList() {

    const [incomeList, setIncomeList] = useState([])

    useEffect ( () => {

        const fetchIncomeList = async () =>{
            await axios.get('http://localhost:8000/income/')
            .then(response => {
                console.log("tttttt",response.data)
                setIncomeList(response.data)
                console.log("Income Test ",incomeList)      
            })
            .catch(error => {
                setAlertMessage("Error Unable to fetch records : " + (error.response ? error.response.data : error.message))
                setAlertType("error")
            })
        }
    fetchIncomeList()
    
    },[])

    return(
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
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {
                        incomeList.map((income,index) => (
                            <tr key={index}>
                            {console.log(income.duration)}
                                <td>{income.category_id}</td> 
                                <td>{income.duration}</td>
                                <td>{income.duration_terms}</td>
                                <td>{income.start_date}</td>
                                <td>{income.end_date || 'N/A'}</td>
                                <td>{income.bill_amount}</td>
                                <td>{income.bill_cycle}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
          </div>
      </div>
    )
}