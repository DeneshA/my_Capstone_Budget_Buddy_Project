import React, { useState } from 'react'

import IncomeChart from './IncomeChart'
import SetupIncome from './SetupIncome'
import IncomeList from './IncomeList'

import '../styles/Template.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
// import {leftArrow} from '@fortawesome/fa-arrow-left'

export default function Income() {

    // current active component
    const [activeComponent, setActiveComponent] = useState('SetupIncome')

    //Switching right to left  <<<<<<<
    const switchLeft = () => {
        if (activeComponent === 'IncomeList') setActiveComponent("SetupIncome")
        else if (activeComponent === 'SetupIncome') setActiveComponent('IncomeChart')
    }
    //Switching left to right >>>>>>>>
    const switchRight = () => {
        if (activeComponent === 'IncomeChart') setActiveComponent('SetupIncome')
        else if (activeComponent === 'SetupIncome') setActiveComponent('IncomeList')
    }
    //Determinig which component to render
    const renderComponent = () => {
        switch (activeComponent) {
            case 'IncomeChart':
                return <IncomeChart />
            case 'SetupIncome':
                return <SetupIncome />
            case 'IncomeList':
                return <IncomeList />
            default:
                return <SetupIncome />
        }
    }
    return (

        <div className='income-container'>

            <div className='component-container'>
                {renderComponent()}
            </div>
            <div className='left-arrow'>
                {/* <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> */}
                <button onClick={switchLeft}>Slide Left</button>
            </div>
            <div className='right-arrow'>
                <button onClick={switchRight}>Slide Right</button>
                {/* <FontAwesomeIcon icon="fa-solid fa-arrow-right" /> */}
                {/* <FontAwesomeIcon icon={faArrowRight} /> */}
            </div>


        </div>
    )
}