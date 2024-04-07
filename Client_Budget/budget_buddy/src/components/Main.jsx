import { Routes, Route } from 'react-router-dom'
import Category from './Category'
import SetupIncome from './SetupIncome'
import Home from './Home'
import IncomeList from './IncomeList'
import IncomeChart from './IncomeChart'


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
                    <Route path='/setupincome/:incomeId?' element={<SetupIncome />}></Route>
                </Routes>

            </div>
           
        </div>
    )
}