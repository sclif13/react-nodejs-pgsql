import React, { Component } from 'react';
import Phones from './Phones';
import './Admin.css';
import {withRouter} from "react-router-dom";
import auth from './Auth';

class Admin extends Component {
    constructor(props) {
        super(props)
        this.componentDidMount = this.componentWillMount.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    componentWillMount() {
        if (!auth.isUserAuthenticated()) {
            this.props.history.push("/")
        }
    }

    clickHandler() {
        auth.deauthenticateUser();
        this.props.history.push("/")
    }

    render() {
        return (
            <div>
                <nav className="Nav">
                    <button className="logout" onClick={this.clickHandler}>logout</button>
                </nav>
                <div className="Admin">
                    <Phones />
                </div>
            </div>
        );
    }
}

export default withRouter(Admin);
