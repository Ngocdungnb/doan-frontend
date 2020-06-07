import React, { Component } from "react";
import { Redirect } from 'react-router';
import MenuDashBoard from "./MenuDashBoard";
import BodyListTransaction from "./ListTransaction/BodyListTransaction";

export default class AdminPage extends Component {
    state = {
    }
    async componentWillMount() {

    }
    render() {
        const listTransaction = () => (
            <div className="container-fluid ">
                <div className="row" style={{minHeight: "100vh"}}>
                  <MenuDashBoard />
                  <BodyListTransaction />
                </div>
            </div>
            )
        return (
            <>
                {localStorage.getItem('login') === 'success' ? listTransaction() : <Redirect to="/admin" />}
            </>
        );
    }
}

