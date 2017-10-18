import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import auth from './Auth';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            error: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let error = [];
        if (!this.state.login) {
            error.push("Введите логин")
        }
        if (!this.state.password) {
            error.push("Введите пароль")
        }
        if (error.length > 0) {
            return this.setState({ error })
        }
        axios({
            method: 'post',
            url: "/login",
            data: {
                login: this.state.login,
                password: this.state.login,
            }
        })
            .then(res => {
                auth.authenticateUser(res.data.token)
                this.setState({ error })
                this.props.history.push("/admin")
            })
            .catch(err => {
                console.log(err)
                error.push("Неправильный логин или пароль")
                this.setState({ error })
            });
    }

    onChangeLogin = e => {
        const { value: login } = e.target;
        this.setState({
            login,
        })
    };

    onChangePassword = e => {
        const { value: password } = e.target;
        this.setState({
            password,
        })
    };

    render() {
        return (
            <form key="login" onSubmit={this.handleSubmit}>
                {this.state.error && <span className="error">{this.state.error.join(" ")}</span>}
                <input type="text" name="login" placeholder="login" onChange={this.onChangeLogin} />
                <input type="password" name="password" placeholder="password" onChange={this.onChangePassword} />
                <input type="submit" value="Login" />
            </form>
        );
    }
}

export default withRouter(Login);
