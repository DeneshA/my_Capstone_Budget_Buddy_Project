import axios from "axios"
import { useEffect, useState } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

import '../styles/Category.css'

export default function Category() {

    const [categoryid, setCategoryId] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [categoryType, setCategoryType] = useState('None')
    const [description, setDescription] = useState('')
    const [isActive, setIsActive] = useState(true)

    const [categorylist, setCategoryList] = useState([])

    const [alertMessage,setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState('')

    
    //Setting timeout to clear the Alert MSG
    const handleAlertTimer = () => {
        setTimeout( () => {
            setAlertMessage('') 
            setAlertType('')}
                ,3000)
    }
    const fetchData = () => {
        axios.get('http://localhost:8000/category/')
            .then(response => {
                console.log(response.data)
                setCategoryList(response.data)
                console.log(categorylist)                
                handleClear()
                
            })
            .catch(error => {
                setAlertMessage("Error Unable to fetch records : " + (error.response ? error.response.data : error.message))
                setAlertType("error")
                handleAlertTimer()
            })
    }
    useEffect(() => {
        fetchData()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(categoryType === "None"){
            setAlertMessage('Select a category type')
            setAlertType('error')
            handleAlertTimer()
            return

        }
        try {
            const response = await axios.post('http://localhost:8000/category/', {
                category_name: categoryName,
                category_type: categoryType,
                description,
                is_active: isActive
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (response.data) {
                setAlertMessage('Saved successfully Saved')
                setAlertType('success')
                fetchData()
                handleClear()
            } else {
                // console.log("Unable to save category !")
                setAlertMessage('Unable to save category')
                setAlertType('error')
            }
            
            // console.log(response.data)
        } catch (error) {
            console.error('There was an error!', error.response ? error.response.data : error.message)
            setAlertMessage('Unable to process save operation')
            setAlertType('error')
        }
        handleAlertTimer()
        
    
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        if(!categoryid || categoryType ==="None"){
            setAlertMessage('Select a Category/Type')
            setAlertType('error')
            return
        }
        try {
            const response = await axios.put(`http://localhost:8000/category/${categoryid}/`, {
                category_name: categoryName,
                category_type: categoryType,
                description,
                is_active: isActive
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (response.data) {
                setAlertMessage('Successfully Updated')
                setAlertType('success')
                handleClear()
                fetchData()
            } else {
                setAlertMessage('Unable to update')
                setAlertType('error')
            }
            // console.log(response.data)
        } catch (error) {
            console.error('There was an error!', error.response ? error.response.data : error.message)
            setAlertMessage('Unable to process update operation')
            setAlertType('error')
        }
        handleAlertTimer()
        
    }

    const handleDelete = (categoryid) => {
        axios.delete(`http://localhost:8000/category/${categoryid}/`)
        .then(() => 
            {
                //Remove the deleted category  from the list
                const updateCategories = categorylist.filter(category => category.id !== categoryid)
                setCategoryList(updateCategories)
                setAlertMessage('Category deleted successfully')
                setAlertType('success')
                fetchData()
            })
        .catch(error => {
                console.error("Error deleting the category : ",error.response ? error.response.data : error.message)
                setAlertMessage('Failed to detele category !')
                setAlertType('error')
        })
        handleAlertTimer()
        
    }

    const handlePassValues = (category) => {
        setCategoryId(category.id)
        setCategoryName(category.category_name)
        setCategoryType(category.category_type)
        setDescription(category.description)
        setIsActive(category.is_active)
    }

    const handleClear = () => {
        setCategoryName('')
        setCategoryType('None')
        setDescription('')
        setIsActive(true)
    }

    return (
        <div className="category-container">
            <h3>SET UP CATEGORY</h3>
            <form onSubmit={handleSubmit}>                
                <div className="form-floating">
                <label htmlFor="category_name">Category Name : </label>                
                    <input type="text"
                        placeholder="Category Name"
                        id="category_name"
                        required
                        value={categoryName}
                        onChange={e => setCategoryName(e.target.value)}
                    />
                </div>
                <div className="form-floating">
                    <label htmlFor="category_type">Category Type : </label>
                    <select name="category_type"
                        id="category_type"
                        value={categoryType}
                        onChange={e => setCategoryType(e.target.value)}>

                        <option value="None">None</option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>
                <div className="form-floating">
                    <label htmlFor="description">Description : </label>
                    <input type="text"
                        placeholder="Description"
                        id="description"
                        value={description}
                        required
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-floating">
                    <label htmlFor="is_active">Active </label>
                    <input type="checkbox"
                        id="is_active"
                        checked={isActive}
                        onChange={e => setIsActive(e.target.checked)} />

                </div>
                
                <div className="form-floating">
                    <button type="button" className="btn" id="clear-btn" onClick={handleClear}>CLEAR</button>
                    <button type="submit" className="btn" id="save-btn">SAVE</button>
                    <button type="button" className="btn" id="edit-btn" onClick={handleUpdate}>EDIT</button>
                </div>
                <div className="alert-container">
                    {alertMessage && (
                        <div className={`alert ${alertType === 'success' ? 'alert-success' : 'alert-error'}`}>
                            {alertMessage}
                        </div>
                    )}
                </div>
            </form>

            <div className="category-display">
                <table className="table-category-list">
                        <thead>
                            <tr>
                                <th>CATEGORY NAME </th>
                                <th>TYPE</th>
                                <th>DESCRIPTION</th>
                                <th>ACTIVE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categorylist.map((list,index) => (
                                    <tr key={index} onDoubleClick={() => handlePassValues(list)}>
                                        <td>{list.category_name}</td>
                                        <td>{list.category_type}</td>
                                        <td>{list.description}</td>
                                        <td>{<input type='checkbox' checked={list.is_active} readOnly={true} />}</td>
                                        <td>
                                            <div className="modify-btn">        
                                                <div className="delete-category" onClick={() => handleDelete(list.id)}><FontAwesomeIcon icon={faTrashCan} /></div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                </table>

            </div>
        </div>


    )
}