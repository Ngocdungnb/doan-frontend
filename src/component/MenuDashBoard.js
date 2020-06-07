import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Redirect} from 'react-router';
import Swal from 'sweetalert2';
import logo from '../logo/NotarizeLogo.png';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';

export default class MenuDashBoard extends Component {
    state = {
        logout: false
    }
    SwalAlert = (type, alertInfo, message) => {
        Swal.fire(
            alertInfo,
            message,
            type
          )
    }
    logoutAdmin = async (e) =>{
        e.preventDefault()
        await fetch(`https://notarized-backend.herokuapp.com/api/users/logout`, {
            method: 'GET'
        })  
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.success){
                    this.SwalAlert("success",data.message)
                    this.setState({logout:true})
                }
            })
        localStorage.clear();
    }
    render() {
        const getDashboard = () =>(        
            <div className="col-xs-12 col-sm-2 col-md-2 dashBoard" style={{background:"aquamarine"}}>
                <a href="#!" className="logo-wrapper waves-effect" style={{marginTop:"25px", marginBottom:"50px"}}>
                    <img alt="MDB React Logo" className="img-fluid" src={logo} />
                </a>
                {/* <div className="menuDashboard">
                    <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <NavLink to="/admin/list-file">       
                        <i className="fa fa-plus" aria-hidden="true" /> <span>List File</span>
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to="/admin/list-transaction">
                            <i className="fa fa-list" aria-hidden="true" /> <span>List Transaction</span>                     
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <button onClick={(e)=> this.logoutAdmin(e)}>
                        <i className="fa fa-sign-out" aria-hidden="true" /> <span>Log Out</span>
                        </button>
                    </li>
                    </ul>
                </div>  */}
                <MDBListGroup className="list-group-flush">
                    <NavLink to='result' activeClassName='activeClass' className="mb-2">
                        <MDBListGroupItem>
                            <MDBIcon icon="user" className="mr-3" />
                            List File
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to='list-transaction' activeClassName='activeClass' className="mb-2">
                        <MDBListGroupItem>
                            <MDBIcon icon="chart-pie" className="mr-3" />
                            List Transaction
                        </MDBListGroupItem>
                    </NavLink>
                    <a href="#!" onClick={(e) => this.logoutAdmin(e)}>
                        <MDBListGroupItem>
                            <MDBIcon icon="exclamation" className="mr-3" />
                            Log Out
                        </MDBListGroupItem>
                    </a>
                </MDBListGroup>
            </div>
        )
        const menuInPhone = () => (
            <div className="menuWindow">
              <form>
                  <ul>
                    <li>
                    <NavLink to="/admin/list-file">
                      <button>
                        <i className="fa fa-plus" aria-hidden="true" /> <span>List File</span>
                      </button>
                      </NavLink>
                    </li>
                    <li>
                    <NavLink to="/admin/list-transaction">
                      <button>
                        <i className="fa fa-list" aria-hidden="true" /> <span>List Transaction</span>
                      </button>
                      </NavLink>
                    </li>
  
                    <li>
                      <button onClick={(e)=> this.logoutAdmin(e)}>
                        <i className="fa fa-sign-out" aria-hidden="true" /> <span>Log Out</span>
                      </button>
                    </li>
                  </ul>
                </form>
            </div>
        )
        return (
            <>
                {this.state.logout ? <Redirect to="/admin" /> : null}
                {(window.innerWidth > 550) ? getDashboard() : menuInPhone()}
            </>
        )
    }
}
