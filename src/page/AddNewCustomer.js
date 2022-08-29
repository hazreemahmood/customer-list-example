import '../App.css';
import React, { useEffect, useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {db} from '../firebase'
import {collection, addDoc, Timestamp, updateDoc} from 'firebase/firestore'
import { onSnapshot } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { orderBy } from 'firebase/firestore';
import { doc } from 'firebase/firestore';


// Routing --------------------

function App(){
    const firstname = useRef(null);
    const lastname = useRef(null);
    const email = useRef(null);
    const telno = useRef(null);
    const edit = useRef(null);
    const customer_id = useRef(null);
    const customergender = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    // const [firstname, setFirstName] = useState("");
    // const [lastname, setLastName] = useState("");
    // const [email, setEmail] = useState("");
    // const [telno, setTelno] = useState("");
    const [customerdata, setCustomerData] = useState([]);
    const [customerid, setCustomerId] = useState();
    const [editform, setEdit] = useState();
    const [gender, setCustomerGender] = useState();
    useEffect(() => {
        if (location.state) {
            const custdata = location.state.data;
            setCustomerData(location.state.data);
            setCustomerId(location.state.id);
            setEdit(location.state.edit);
        }
    },[])

    /* function to add new task to firestore */
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (edit.current.value) {
                console.log(customer_id.current.value);
                const updDoc = doc(db, 'tasks', customer_id.current.value);
                const field = {
                    firstname: firstname.current.value,
                    lastname: lastname.current.value,
                    email: email.current.value,
                    telno: telno.current.value,
                    gender: customergender.current.value,
                    completed: false,
                    created: Timestamp.now()
                }
                await updateDoc(updDoc, field);
                // 👇️ redirect to /list
                navigate('/list', {state: {show:true, title: 'Success!', message: 'Record Updated Successfully', type: 'success && text-white'}});
            }else{
                await addDoc(collection(db, 'tasks'), {
                firstname: firstname.current.value,
                lastname: lastname.current.value,
                email: email.current.value,
                telno: telno.current.value,
                gender: customergender.current.value,
                completed: false,
                created: Timestamp.now()
                })
                // 👇️ redirect to /list
                navigate('/list', {state: {show:true, title: 'Success!', message: 'New Record Added', type: 'success && text-white'}});
            }
        } catch (err) {
            alert(err)
        }
    }

    function handleTemplateChange() {
        const genders = customergender.current.value;
        setCustomerGender(genders);
    }
    
    return (
        <div class="container">
            <h2>{editform ? 'Edit Customer' : 'Create New Customer'}</h2>
            <div className="back-button">
                <Button to="/add_new" variant="primary"><div className="button-link"><Link to="/list">Back</Link></div></Button>
            </div>
            <br/>
            <br/>
            <br/>
            <Form onSubmit={handleSubmit}>
                <Form.Control type="hidden" placeholder="edit" ref={edit} defaultValue={editform} />
                <Form.Control type="hidden" placeholder="edit" ref={customer_id} defaultValue={customerid} />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control type="text" placeholder="Enter firstname" ref={firstname} defaultValue={customerdata.firstname} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail" >
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control type="text" placeholder="Enter lastname" ref={lastname} defaultValue={customerdata.lastname} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" ref={email} defaultValue={customerdata.email} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tel. No</Form.Label>
                    <Form.Control type="text" placeholder="Enter Tel. No" ref={telno} defaultValue={customerdata.telno} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select ref={customergender} value={gender ? gender : customerdata.gender} onChange={() => handleTemplateChange()} aria-label="Default select example">
                        <option>Select Gender</option>
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </Form.Select>
                    {/* <Form.Control type="text" placeholder="Enter Gender" ref={customergender} defaultValue={customerdata.gender} /> */}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default App;