import './App.css';
import React, { useEffect, useState } from 'react';
import { Form, Button, Table, ToastContainer, Toast } from 'react-bootstrap';
import { Link, Route, Router, Routes, useLocation } from 'react-router-dom';
import {collection, query, orderBy, onSnapshot, doc, deleteDoc} from "firebase/firestore"
import {db} from './firebase'



// Routing --------------------

function CustomerList() {
  const [show, setShow] = useState([false])
  const [tasks, setTasks] = useState([])
  const [customerId, setCustomerId] = useState()
  const location = useLocation();

/* function to get all tasks from firestore in realtime */ 
  useEffect(() => {
    if (location.state) {
      setShow([location.state.show, '', location.state.message, location.state.type, true, location.state.title]);
    }
      const q = query(collection(db, 'tasks'), orderBy('created', 'desc'))
      onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
      })))
      })
      // reset state everytime enter this page.
      window.history.replaceState({}, document.title)

  },[])
  
  /* function to delete a document from firstore */ 
  function handleDelete (id){
    const taskDocRef = doc(db, 'tasks', id)
    try{
      deleteDoc(taskDocRef)
      setShow([true,'','Record Successfully Deleted.', 'success && text-white', true, 'Success'])
      // navigate('/list', {state: {show:true, message: 'Record Deleted!', type: 'success'}});
    } catch (err) {
      alert(err)
    }
  }
  /* function to delete a document from firstore */ 
  function handleEdit (id){
    // const taskDocRef = doc(db, 'tasks', id)
    setCustomerId(id);
  }

  return (
    <div class="container">
      <ToastContainer position="top-end" className="p-3">
        <Toast bg={show[3]} onClose={() => setShow([false])} show={show[0]} delay={3000} autohide={show[4]}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">
            {show[1] ? 'Delete record?' : show[5]}
            </strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>
            {show[2]}
            {show[1] ? 
            <div>
              <Button className="toast-button" variant="danger" onClick={() => handleDelete(show[1])}>Yes</Button>
              <Button className="toast-button" variant="success" onClick={() => setShow([false])}>No</Button>
            </div> : ''}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <h2>Customer Listing</h2>
        <div className="add-new">
          <Button variant="primary"><div className="button-link"><Link to="/add_new">Add New</Link></div></Button>
        </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Tel. No</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((custdata, index) => (  
            <tr>
              <td>{index+1}</td>
              <td><Link to="/view" state={{id: custdata.id, data: custdata.data, edit: 1}}>{custdata.data.firstname}</Link></td>
              <td>{custdata.data.lastname}</td>
              <td>{custdata.data.email}</td>
              <td>{custdata.data.telno}</td>
              <td>
                <Button className='action_btn' variant="primary" onClick={() => handleEdit(custdata.id)}>
                  <div className="button-link"><Link to="/edit" state={{id: custdata.id, data: custdata.data, edit: 1}}>Edit</Link></div>
                  {/* Edit */}
                  </Button>
                <Button className='action_btn' variant="danger" onClick={() => setShow([true,custdata.id,'Are you sure you want to delete this record?.', 'warning'])}>Delete</Button>
              </td>
            </tr>
          ))}  
        </tbody>
      </Table>
    </div>
  );
};

export default CustomerList;