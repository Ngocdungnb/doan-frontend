import React, { Component } from "react";
import { Redirect } from 'react-router';
import Swal from 'sweetalert2';

export default class LoginAdmin extends Component {
    state = {
        username: '',
        password: '',
        isLogin: false
    }
    SwalAlert = (type, alertInfo, message) => {
        Swal.fire(
            alertInfo,
            message,
            type
          )
    }
    handleOnclick = async (e) => {
        e.preventDefault();
        // fetch data here

        await fetch(`https://notarized-backend.herokuapp.com/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then(data => {
                if(data.success === false) {
                    this.SwalAlert('error', data.message)
                } else {
                    this.SwalAlert('success', data.message)
                    setTimeout(() => {
                        this.setState({isLogin: true})
                    }, 1000) 
                }
            })
            .catch(error => console.log(error))
        localStorage.setItem('login', 'success')
    }
    render() {
        return (
            <>
                {this.state.isLogin ? <Redirect to='/admin/result' /> : (
                    <div className="wrapper bodyLogin fadeInDown" style={{minHeight:"100vh",background:"whitesmoke"}}>
                        <div id="login">
                            <div className="container-fluid">
                                <div id="login-row" className="row justify-content-center align-items-center">
                                    <div id="login-column" className="col-md-6 border border-secondary" style={{marginTop: "100px", background: "cornsilk"}}>
                                        <div id="login-box" className="col-md-12">
                                            <form id="login-form" className="form">
                                            <h3 style={{marginTop: "25px"}} className="text-center text-success">Login Admin Dashboard</h3>
                                            <div className="form-group">
                                                <label htmlFor="username" className="text-primary">Username:</label><br />
                                                <input type="text" name="username" onChange={e => this.setState({username: e.target.value})} id="username" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password" className="text-primary">Password:</label><br />
                                                <input type="password" name="password" onChange={e => this.setState({password: e.target.value})} id="password" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <input type="submit" name="submit" onClick={this.handleOnclick} className="btn btn-primary btn-lg" value="Login" />
                                            </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

