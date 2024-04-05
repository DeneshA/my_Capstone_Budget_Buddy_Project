import { Routes, Route } from 'react-router-dom'
import Category from './Category'
import Income from './Income'
import Header from './Header'
import Footer from './Footer'


export default function Main() {
    return (
        <div>
            {/* <h1>I am Main</h1> */}
            <Header />
            <div>
                {/* <Category /> */}
                <Income />
                {/* <Routes>
            {/* <Route path='/' exact element={<Home />}></Route> */}
                {/* <Route path='/category' element={<Category />}></Route>
            <Route path='/income' element={<Income/>}></Route> */}
                {/* </Routes> */}

            </div>
            <Footer />
        </div>
    )
}