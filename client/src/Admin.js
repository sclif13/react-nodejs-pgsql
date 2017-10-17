import React, { Component } from 'react';
import Phones from './Phones';
import './Admin.css';

class Admin extends Component {
    render() {
        return (
            <div>
                <nav className="Nav">
                    <div>admin</div>
                </nav>
                <div className="Admin">
                    <Phones />
                </div>
            </div>
        );
    }
}

export default Admin;
