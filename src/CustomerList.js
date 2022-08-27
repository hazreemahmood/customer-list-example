import './App.css';
import React, { useEffect, useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { Link, Route, Router, Routes } from 'react-router-dom';
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from './firebase'
import CustomerListManager from './CustomerListManager';



// Routing --------------------

function CustomerList() {
  const [openAddModal, setOpenAddModal] = useState(false)
  const [tasks, setTasks] = useState([])

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
  console.log(tasks);

  return (
    <div>
      <h2>Customer Listing</h2>
        <div className="add-new">
          <Button to="/add_new" variant="primary"><div className="button-link"><Link to="/add_new">Add New</Link></div></Button>
        </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((student, index) => (  
            <tr>
              <td>{index+1}</td>
              <td>{student.data.firstname}</td>
              <td>{student.data.lastname}</td>
            </tr>
          ))}  
        </tbody>
      </Table>
    </div>
  );
};

export default CustomerList;