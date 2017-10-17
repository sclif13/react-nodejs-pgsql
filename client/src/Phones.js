import React, { Component } from 'react';
import axios from 'axios';

class Phones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            phones: [],
            error: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
    }
    componentDidMount() {
        axios.get("/phones")
            .then(res => {
                if (res.status === 200 && res.data) {
                    this.setState({ phones: res.data })
                } else {
                    throw new Error()
                }
            })
            .catch(error => {
                this.setState({ error: "Ошибка в получении данных" })
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { phones } = this.state;
        if (/^\d+$/.test(this.state.phone)) {
            axios({
                method: "post",
                url: "/phones/phone",
                data: {
                    phone: this.state.phone
                }
            })
                .then((res) => {
                    if (res.status === 200) {
                        phones.push(res.data)
                        this.setState({ phones, phone: "", error: "" })
                    } else {
                        throw new Error();
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.setState({ error: "Ошибка передачи данных" })
                })

        } else {
            this.setState({ error: "Неправильный номер" })
        }
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
        const { phones } = this.state;
        if (e.which === 13 & value.length > 0) {
            e.preventDefault();
            if (/^\d+$/.test(this.state.phone)) {
                axios({
                    method: "post",
                    url: "/phones/phone",
                    data: {
                        phone: this.state.phone
                    }
                })
                    .then((res) => {
                        if (res.status === 200) {
                            phones.push(res.data)
                            this.setState({ phones, phone: "", error: "" })
                        } else {
                            throw new Error();
                        }
                    })
                    .catch(error => {
                        console.error(error)
                        this.setState({ error: "Ошибка передачи данных" })
                    })

            } else {
                this.setState({ error: "Неправильный номер" })
            }
        }
    }

    deleteHandler = (id) => {
        axios({
            method: "delete",
            url: `/phones/phone/${id}`,
        })
            .then(res => {
                if (res.status === 200) {
                    const phones = this.state.phones.filter((item) => item.id !== id)
                    this.setState({ phones, error: "" })
                } else {
                    throw new Error();
                }
            })
            .catch(error => {
                console.error(error)
                this.setState({ error: "Ошибка передачи данных" })
            })
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.phones.map((item) => {
                        return <li key={item.id}><span>{item.phone}</span>
                            <button
                                className="remove"
                                data-id={item.id}
                                onClick={this.deleteHandler.bind(null, item.id)}>Удалить</button></li>
                    })}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Телефон"
                        value={this.state.phone}
                        onChange={this.onChange}
                        onKeyDown={this.onKeyDown}
                    />
                    <input type="submit" value="Добавить" />
                </form>
                {this.state.error && <div className="error">{this.state.error}</div>}
            </div>
        )
    }
}

export default Phones