import React, { Component } from 'react';

class Login extends Component {
    handleSubmit(event) {
        alert('A name was submitted: ');
        event.preventDefault();
    }

    render() {
        return (
            <form key="login" onSubmit={this.handleSubmit}>
                <input type="text" name="login" placeholder="login" />
                <input type="password" name="password" placeholder="password" />
                <input type="submit" value="Login" />
            </form>
        );
  }
}

export default Login;
