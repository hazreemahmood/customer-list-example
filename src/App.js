import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Authentication from './Authentication';
import CustomerList from './CustomerList';
import AddNewCustomer from './page/AddNewCustomer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import { Header } from '../src/components/Header';

// Pages ----------------------

const Home = () => {
  return <Header />;
};

const Auth = () => {
  return <Authentication />
};

const List = () => {
  return <CustomerList />
};
const AddNew = () => {
  return <AddNewCustomer />
};

const Edit = (customerid) => {
  return <AddNewCustomer customerid={customerid}/>
}

// Routing --------------------

const App = () => {
  return (
    <div class="App">
      <Router>
        <Nav defaultActiveKey="/" as="ul">
          <Nav.Item as="li">
            <Nav.Link eventKey="disabled" disabled>Hello, Guest</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/list" eventKey="link-1">List</Nav.Link>
          </Nav.Item>
        </Nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/add_new" element={<AddNew />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;