import axios from "axios"
import { useEffect, useState } from "react"

export default function Category() {

    const [categoryid, setCategoryId] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [categoryType, setCategoryType] = useState('None')
    const [description, setDescription] = useState('')
    const [isActive, setIsActive] = useState(true)

    const [alertMessage,setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState('')

    useEffect(() => {
        const fetchDate = () => {
            axios.get('http://localhost:8000/category/')
                .then(response => {
                    console.log(response.data)
                    setAlertMessage('Successfully Saved')
                    setAlertType('success')
                    handleClear()
                    //Setting timeout to clear the Alert MSG
                    setTimeout( () => setAlertMessage(''),3000)
                })
                .catch(error => {
                    setAlertMessage("You got an error : " + (error.response ? error.response.data : error.message))
                    setAlertType("error")
                })
        }

        fetchDate()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log({ categoryName, categoryType, description, isActive })
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
                console.log("Sucessfully saved")
                handleClear()
            } else {
                console.log("Unable to save category !")
            }
            console.log(response.data)
        } catch (error) {
            console.error('There was an error!', error.response ? error.response.data : error.message)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:8000/category/${id}`, {
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
                console.log("Sucessfully updated")
                handleClear()
            } else {
                console.log("Unable to update category !")
            }
            console.log(response.data)
        } catch (error) {
            console.error('There was an error!', error.response ? error.response.data : error.message)
        }
    }

    const handleClear = () => {
        setCategoryName('')
        setCategoryType('None')
        setDescription('')
        setIsActive(true)
    }

    return (
        <div className="category-container">
            <h3>Set up Category</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-floating">
                    <label htmlFor="category_name">Category Name : </label>
                    <input type="text"
                        placeholder="Category Name"
                        id="category_name"
                        value={categoryName}
                        onChange={e => setCategoryName(e.target.value)}
                    />
                    <select name="category_list"
                        id="category_list">Category List</select>
                    <option></option>
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
                <div className="alert-container">
                    {alertMessage && (
                        <div className={`alert ${alertType === 'success' ? 'alert-success' : 'alert-error'}`}>
                            {alertMessage}
                        </div>
                    )}
                </div>
                <div className="form-floating">
                    <button type="button" className="btn" id="clear-btn" onClick={handleClear}>CLEAR</button>
                    <button type="submit" className="btn" id="save-btn">SAVE</button>
                    <button type="button" className="btn" id="edit-btn">EDIT</button>
                    <button type="button" className="btn" id="delete-btn">DELETE</button>
                </div>

            </form>
        </div>


    )
}