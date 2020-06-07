import React, { Component } from 'react';
import Swal from 'sweetalert2';
import ItemListTransaction from './ItemListTransaction';

const api = require('etherscan-api').init('K1BD9Z7AN6RAVGC7E6KFJYDMEFMY9FMEED', 'ropsten', '3000');

export default class BodyListTransaction extends Component {
    state = {
      result: []
    }

    SwalAlert = (type, alertInfo, message) => {
        Swal.fire(
            alertInfo,
            message,
            type
          )
    }

    componentWillMount() {
      api.account.txlist("0xd13AbB86F7132d2cbb5BA35ae062E3d837b393Eb", 5, 'latest', 1, 100, 'asc').then(r => this.setState({result: r.result}))

            
    }



    render() {

      const showDataFileList = () => (
          <div className="col-xs-12 col-sm-10 col-md-10 payLoad" style={{background: "whitesmoke"}}>
          <div className="headTitle" style={{fontSize: "x-large", fontWeight: "bolder"}}>
            <span>Danh Sách Các Khối Giao Dịch</span>
          </div>
          <hr/>
          <div className="tableListOrder">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th style={{fontWeight: "700"}}>Stt</th>
                <th style={{fontWeight: "700"}}>Blocks</th>
                <th style={{fontWeight: "700"}}>Mã Giao Dịch</th>
                <th style={{fontWeight: "700"}}>Thời Gian Tạo</th>
              </tr>
            </thead>
            <tbody>
                {/* {console.log(this.state.result)} */}
                {this.state.result.map((value, key) => <ItemListTransaction page={1} key={key} index={key} transactionInfo = {value}/>)}
            </tbody>
          </table>
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
