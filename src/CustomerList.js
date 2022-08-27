import './App.css';
import React, { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { Link, Route, Router, Routes } from 'react-router-dom';


// Routing --------------------


const AddNew = () => {
  return <h2>Add New</h2>
};

const List = () => {
  return (
    <div>
      <h2>Customer Listing</h2>
        <div className="add-new">
          <Button onClick={AddNew} to="/add_new" variant="primary"><div className="button-link"><Link to="/add_new">Add New</Link></div></Button>
        </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default List;