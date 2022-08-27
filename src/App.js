import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Authentication from './Authentication';
import CustomerList from './CustomerList';
import AddNewCustomer from './page/AddNewCustomer';
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages ----------------------

const Home = () => {
  return <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>;
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

// Routing --------------------

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="top-menu">
            <div className="top-menu-nav">
                <div className="top-menu-nav-child">Hello, Guest</div>
                <div className="top-menu-nav-child"><Link to="/">Home</Link></div>
                <div className="top-menu-nav-child"><Link to="/auth">Login / Register</Link></div>
                <div><Link to="/list">List</Link></div>
            </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/add_new" element={<AddNew />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;