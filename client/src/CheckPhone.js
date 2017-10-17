import React, { Component } from 'react';
import axios from 'axios';
class CheckPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            phone: "",
            error: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getPhone = this.getPhone.bind(this);

    }

    handleSubmit(e) {
        e.preventDefault();
        this.getPhone();
    }

    onChange = e => {
        const { value: phone } = e.target;
        if (/^\d+$/.test(phone) || phone === "") {
            this.setState({
                phone,
            })
        }
    };


    onKeyDown = (e) => {
        const { value } = e.target;
        if (e.which === 13 & value.length > 0) {
            e.preventDefault();
            this.getPhone();
        }
    }

    getPhone = () => {
        if (/^\d+$/.test(this.state.phone)) {
            axios({
                method: "get",
                url: `/phones/phone/${this.state.phone}`,
            })
                .then((res) => {
                    this.setState({ text: `Телефон ${res.data.phone} найден`, error:"" })
                })
                .catch(error => {
                    console.error(error)
                    this.setState({ error: "Телефон не найден", text: "" })
                })

        } else {
            this.setState({ error: "Неправильный номер" })
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="phone"
                        placeholder="телефон"
                        value={this.state.phone}
                        onChange={this.onChange}
                        onKeyDown={this.onKeyDown}
                    />
                    <input type="submit" value="OK" />
                </form>
                {this.state.text && <div className="text">{this.state.text}</div>}
                {this.state.error && <div className="error">{this.state.error}</div>}
            </div>
        );
    }
}

export default CheckPhone;
