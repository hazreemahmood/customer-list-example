import './App.css';
import React, { useEffect, useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { Link, Route, Router, Routes } from 'react-router-dom';
import {collection, query, orderBy, onSnapshot, doc, deleteDoc} from "firebase/firestore"
import {db} from './firebase'



// Routing --------------------

function CustomerList() {
  const [tasks, setTasks] = useState([])
  const [customerId, setCustomerId] = useState()

/* function to get all tasks from firestore in realtime */ 
  useEffect(() => {
      const q = query(collection(db, 'tasks'), orderBy('created', 'desc'))
      onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
      })))
      })
  },[])
  
  /* function to delete a document from firstore */ 
  function handleDelete (id){
    const taskDocRef = doc(db, 'tasks', id)
    try{
      deleteDoc(taskDocRef)
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
    <div>
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
          {tasks.map((student, index) => (  
            <tr>
              <td>{index+1}</td>
              <td>{student.data.firstname}</td>
              <td>{student.data.lastname}</td>
              <td>{student.data.email}</td>
              <td>{student.data.telno}</td>
              <td>
                <Button className='action_btn' variant="primary" onClick={() => handleEdit(student.id)}>
                  <div className="button-link"><Link to="/edit" state={{id: student.id, data: student.data, edit: 1}}>Edit</Link></div>
                  {/* Edit */}
                  </Button>
                <Button className='action_btn' variant="danger" onClick={() => handleDelete(student.id)}>Delete</Button>
              </td>
            </tr>
          ))}  
        </tbody>
      </Table>
    </div>
  );
};

export default CustomerList;