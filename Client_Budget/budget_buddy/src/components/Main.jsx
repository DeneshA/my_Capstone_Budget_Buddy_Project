import { Routes, Route } from 'react-router-dom'
import Category from './Category'
import SetupIncome from './SetupIncome'
import Home from './Home'
import IncomeList from './IncomeList'
import IncomeChart from './IncomeChart'
import Expense from './Expense'
import SetupExpense from './SetupExpense'
import ExpenseChart from './ExpenseChart'
import ExpenseList from './ExpenseList'
import Reminder from './Reminder'
import Signup from './Signup'
import Signout from './Signout'
import Signin from './Signin'
// import React, {useState,useEffect} from 'react'
// import axios from 'axios'


export default function Main() {    

    return (
        <div>
            
            <div>
                <Routes>
                    {/* <Route path='/' exact element={<Home />}></Route> */}
                    <Route path='/' exact element={<Home />}></Route>
                    <Route path='/category' element={<Category />}></Route>
                    <Route path='/incomelist' element={<IncomeList />}></Route>
                    {/* <Route path='/income/:userId?' element={<Income />}></Route> */}
                    <Route path='/incomechart' element={<IncomeChart />}></Route>
                    <Route path='/setupincome' element={<SetupIncome />}></Route>
                    <Route path='/setupincome/:incomeId' element={<SetupIncome />}></Route>
                    <Route path='/setupexpense' element={<SetupExpense />}></Route>
                    <Route path='/setupexpense/:expenseId' element={<SetupExpense />}></Route>
                    <Route path='/expensechart' element={<ExpenseChart />}></Route>
                    <Route path='/expenselist' element={<ExpenseList />}></Route>
                    <Route path='/reminder' element={<Reminder />}></Route>

                    <Route path='/signin' element={<Signin />}></Route>
                    <Route path='/signup' element={<Signup />}></Route>
                    <Route path='/signout' element={<Signout />}></Route>
                    {/* <Route path='/expense/:expenseId' element={<Expense />}></Route> */}
                </Routes>

            </div>
           
        </div>
    )
}