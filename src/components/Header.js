import React, { Component } from 'react';

export class Header extends Component {

    render() {
        return(
            <div className="top-menu">
                <div className="top-menu-nav">
                    <div className="top-menu-nav-child">Hello, Guest</div>
                    <div><a href="#auth">Register / Login</a></div>
                </div>
            </div>
        )
    }

}