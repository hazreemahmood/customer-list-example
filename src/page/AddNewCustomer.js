import '../App.css';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {db} from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'


// Routing --------------------

const App = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");

    /* function to add new task to firestore */
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await addDoc(collection(db, 'tasks'), {
            firstname: firstname,
            lastname: lastname,
            completed: false,
            created: Timestamp.now()
            })
        } catch (err) {
            alert(err)
        }
    }
    
    return (
        <div>
            <h2>Create New Customer</h2>
            <div className="back-button">
                <Button to="/add_new" variant="primary"><div className="button-link"><Link to="/list">Back</Link></div></Button>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Firstname</Form.Label>
                <Form.Control type="text" placeholder="Enter firstname" 
                    onChange={(e) => setFirstName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Lastname</Form.Label>
                <Form.Control type="text" placeholder="Enter Lastname" 
                    onChange={(e) => setLastName(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default App;