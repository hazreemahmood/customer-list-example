import React, { Component } from 'react';
import logo from '../logo.svg';

export class Header extends Component {

    render() {
        return(
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Hello, Please press 1 of the link on top right
                </p>
            </header>
        )
    }

}