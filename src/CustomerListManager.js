// JavaScript
// src/TaskManager.js
import CustomerList from './CustomerList'
import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from './firebase'

function CustomerListManager({firstname, lastname, completed}) {
    const [checked, setChecked] = useState(completed)
    const [open, setOpen] = useState({edit:false, view:false})

    return (
        <div className='taskManager'>
            <header>Task Manager</header>
            <div className='taskManager__container'>
                <div className='taskManager__tasks'>
                    <h2>{firstname}</h2>
                </div>
            </div>
        </div>
)
}

export default CustomerListManager