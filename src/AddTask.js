// JavaScript
// src/AddTask.js
import {db} from './firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'

// JavaScript
// src/AddTask.js
/* function to add new task to firestore */
const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        await addDoc(collection(db, 'tasks'), {
        firstname: firstname,
        lastname: lastname,
        created: Timestamp.now()
        })
        onClose()
    } catch (err) {
        alert(err)
    }
}

// JavaScript
// src/AddTask.js
{/* <form onSubmit={handleSubmit} className='addTask' name='addTask'></form> */}