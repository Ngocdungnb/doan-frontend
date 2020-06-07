import React, { Component } from 'react';
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
import Swal from 'sweetalert2';
import ItemListFile from './ItemListFile';

export default class BodyListFile extends Component {
    state = {
        page: 0,
        countPage: [],
        pageSize: 10,
        data: [],
        searchInput: ''
    }

    SwalAlert = (type, alertInfo, message) => {
        Swal.fire(
            alertInfo,
            message,
            type
          )
    }

    async componentWillMount() {
        await fetch(`https://notarized-backend.herokuapp.com/api/posts/get-page-file?pageNumber=${this.state.page + 1}&pageSize=${this.state.pageSize}`, {
                method: 'GET'
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    const pageArr =[]
                    for(let i=0; i<= data.total;i++){
                      if(i%10 ===0){
                        pageArr.push(i/10)
                      }
                    }
                    // console.log(pageArr)
                    this.setState({ countPage: pageArr, data: data.data})
                })
                .catch(error => console.log(error))
    }

    getOrderByPage = async (e)=>{
        e.preventDefault()
        let page = e.target.value
        this.setState({page})
        
        try {
            await fetch(`https://notarized-backend.herokuapp.com/api/posts/get-page-file?pageNumber=${page}&pageSize=${this.state.pageSize}`, {
                method: 'GET'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if(data.success) {
                        console.log('LAY PAGE FILE OKEE')
                        this.setState({data: data.data})
                    } else {
                        this.SwalAlert("error", data.message)
                        return
                    }
                })
                .catch(error => console.log(error))

        } catch (error) {
          this.SwalAlert("error",error)
          return
        }
  
    }

    handleOnchange = (e) => {
      this.setState({searchInput: e})
    }

    render() {
      const filterFiles = this.state.data.filter(filename => {
        return filename.fileName.toLowerCase().indexOf(this.state.searchInput.toLowerCase()) !== -1;
      });
      const showDataFileList = () => (
          <div className="col-xs-12 col-sm-10 col-md-10 payLoad" style={{background: "whitesmoke"}}>
          <div className="headTitle" style={{fontSize: "x-large", fontWeight: "bolder"}}>
            <span>Danh Sách file hồ sơ bệnh án</span>
            <MDBCol md="6">
              <MDBFormInline className="md-form">
                <MDBIcon className="text-danger" icon="search" />
                <input onChange={e => this.handleOnchange(e.target.value)} className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
              </MDBFormInline>
            </MDBCol>
          </div>
          <hr/>
          <div className="tableListOrder">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th style={{fontWeight: "700"}}>Stt</th>
                <th style={{fontWeight: "700"}}>Tên File Bệnh Án</th>
                <th style={{fontWeight: "700"}}>Mã File</th>
                <th style={{fontWeight: "700"}}>Thời Gian Tạo</th>
                <th style={{fontWeight: "700"}}>Tải Xuống</th>
              </tr>
            </thead>
            <tbody>
                {/* {console.log(this.state.data)} */}
                {filterFiles.map((value, key) => <ItemListFile page={this.state.page} key={key} index={key} fileInfo = {value}/>)}
              {/* {console.log(GetListOrder)} */}
              {/* {GetListOrder.map((value,key)=>(<ItemListOrder page={page} key={key} index={key} orderInfo = {value}/>))} */}
              {/* {this.state.data.map((value, key) => {
                  {console.log(value)}
              <tr>
                  <td>{ (this.state.page > 0) ? ((10*(this.state.page-1) + key) + 1) : (key + 1)}</td>
                  <td>{value.fileName}</td>
                  <td>{value.transactionHash}</td>
                  <td>{value.createAt}</td>
              </tr> 
              })} */}
            </tbody>
          </table>
          </div>
          <div className="pageTable">
            {this.state.countPage.map((value,key) => (<button key={key} value={value+1} onClick={(e) => this.getOrderByPage(e)}>{value+1}</button>))}
            </div>
          
        </div>
        
        )
      return (
          <>
              {showDataFileList()}
          </>
      ) 
    }
}
