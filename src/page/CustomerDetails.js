import '../App.css';
import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, ToastContainer, Toast, Col, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {db} from '../firebase'
import {collection, addDoc, Timestamp, updateDoc} from 'firebase/firestore'
import { onSnapshot } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { orderBy } from 'firebase/firestore';
import { doc } from 'firebase/firestore';


// Routing --------------------

function App(){
    const customername = useRef(null);
    const customer_id = useRef(null);
    const customeremail = useRef(null);
    const edit = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [customerName, setCustomerName] = useState("");
    const [customerdata, setCustomerData] = useState([]);
    const [customerid, setCustomerId] = useState();
    const [editform, setEdit] = useState();
    const [show, setShow] = useState([false]);
    useEffect(() => {
        if (location.state) {
            setCustomerData(location.state.data);
            setCustomerId(location.state.id);
            setEdit(location.state.edit);
            setCustomerName(location.state.data.firstname + ' ' + location.state.data.lastname);
        }
    },[])

    
    return (
        <div class="container">
            <h2>Customer Details</h2>
            <div className="back-button">
                <Button to="/add_new" variant="primary"><div className="button-link"><Link to="/list">Back</Link></div></Button>
            </div>
            <br/>
            <br/>
            <br/>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">Customer Name</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text"
        placeholder="Disabled input"
        aria-label="Disabled input example"
        disabled
        readOnly defaultValue={customerName} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                    <Form.Label column sm="2">Email</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text"
        placeholder="Disabled input"
        aria-label="Disabled input example"
        disabled
        readOnly defaultValue={customerdata.email} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                    <Form.Label column sm="2">Tel. No</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text"
        placeholder="Disabled input"
        aria-label="Disabled input example"
        disabled
        readOnly defaultValue={customerdata.telno} />
                    </Col>
                </Form.Group> 
                <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                    <Form.Label column sm="2">Gender</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text"
        placeholder="Disabled input"
        aria-label="Disabled input example"
        disabled
        readOnly defaultValue={customerdata.gender} />
                    </Col>
                </Form.Group>    
            </Form>
        </div>
    );
};

export default App;