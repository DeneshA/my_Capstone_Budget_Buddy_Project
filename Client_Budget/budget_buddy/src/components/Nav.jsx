import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { faHandHolding } from '@fortawesome/free-solid-svg-icons';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom'
import '../styles/Nav.css'


export default function Nav(){
    return(
        <div className="nav-bar-icons">
            <div className="home-icon icons"><FontAwesomeIcon icon={faHouse} size="2xl" style={{color: "#f2f5f8",}} /><br></br><Link to='/'>Home</Link></div>
            <div className="home-icon icons"><FontAwesomeIcon icon={faHandHoldingDollar} size="2xl" style={{color: "#f5f7f9",}} /><br></br><Link to='/setupincome'>Income</Link></div>
            <div className="expense-icon icons"><FontAwesomeIcon icon={faHandHolding} size="2xl" style={{color: "#f2f4f8",}} /><br></br><Link to='/setupexpense'>Expense</Link></div>
            <div className="home-icon icons"><FontAwesomeIcon icon={faLayerGroup} size="2xl" style={{color: "#f4f5f6",}} /><br></br><Link to='/category'>Category</Link></div>
            <div className="expense-icon icons"><FontAwesomeIcon icon={faBullseye} size="2xl" style={{color: "#f4f5f6",}} /><br></br><Link to='/'>Goal Planer</Link></div>
            <div className="expense-icon icons"><FontAwesomeIcon icon={faClock} size="2xl" style={{color: "#f2f4f8",}} /><br></br><Link to='/reminder'>Reminder</Link></div>

        </div>
    )
}