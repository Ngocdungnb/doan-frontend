import React, { Component } from "react";
import { Redirect } from 'react-router';
import MenuDashBoard from "./MenuDashBoard";
import BodyListFile from "./ListFile/BodyListFile";

export default class AdminPage extends Component {
    state = {
        data: []
    }
    async componentWillMount() {
        console.log('ADMINPAGE')
        await fetch(`https://notarized-backend.herokuapp.com/api/posts/get`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                console.log('data tu trang adminpage', data)
                if(data.success === true) {
                    // get data
                    this.setState({data})
                }
            })
            .catch(error => console.log(error))
    }
    render() {
        const listFile = () => (
            <div className="container-fluid ">
                <div className="row" style={{minHeight: "100vh"}}>
                  <MenuDashBoard />
                  <BodyListFile />
                </div>
            </div>
            )
        return (
            <>
                {localStorage.getItem('login') === 'success' ? listFile() : <Redirect to="/admin" />}
            </>
        );
    }
}

