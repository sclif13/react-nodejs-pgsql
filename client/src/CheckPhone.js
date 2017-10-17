import React, { Component } from 'react';

class CheckPhone extends Component {
    handleSubmit(event) {
        alert('A name was submitted: ');
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="tel" name="tel" placeholder="телефон" />
                <input type="submit" value="OK" />
            </form>
        );
  }
}

export default CheckPhone;
