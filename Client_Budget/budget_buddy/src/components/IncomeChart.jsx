import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

import IncomeList from './IncomeList';
import  '../styles/Income.css'

import IncomeBarchar from './IncomeBarChart'

export default function IncomeChart() {

  const [incomeList, setIncomeList] = useState([])
  const [data, setData] = useState([])
  const [dataBarChart, setDataBarChart] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/income/')
      .then(response => {
        setIncomeList(response.data)
      })
      .catch(error => {
       
        console.error("Error Unable to fetch records : ", error.response ? error.response.data : error.message)
      })
  }, [])

  useEffect(() => {
    // Only convert budget when incomeList is updated and not empty
    if (incomeList.length > 0) {
      const newData = incomeList.map(income => {
        let value
        switch (income.bill_cycle) {
          case "Annually":
            value = income.bill_amount / 12
            
            break
          case "Bi-Weekly":
            value = income.bill_amount * 2
            break
          case "Weekly":
            value = income.bill_amount * 4
            break
          case "Daily":
            value = income.bill_amount * 30
            break
          case "Monthly":
          default:
            value = income.bill_amount
        }
        return { name: income.category_name, value }
      });
      setData(newData)
    }
  }, [incomeList])

 
  // const data = [
  //     {name: "Facebook",value:1000000},
  //     {name: "Instrgram",value:250000},
  //     {name: "Twiter",value:3510000},
  //     {name: "Telegrame",value:1850000},
  // ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#FF8085',
                  '#FFAA28','#89C49F', '#FTGB28','#FF9575','#FFAA84',
                  '#81H49F','#0568FE', '#28C49F','#FFBC58'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }
  return (
    <div className="income-container main-container">
      <div className='pie-chart-container'>
        <h2>Monthly Average Incomes</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      </div>

      {/* <div className='bar-chart-income'>
            <h3>Bar Chart</h3>
        <IncomeBarchar />
      </div> */}
    </div>
  )
}
