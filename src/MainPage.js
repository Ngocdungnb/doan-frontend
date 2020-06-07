import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import NavBar from './containers/NavBar';
import './css/maincontent.css';
import MainContent from './containers/MainContent';
import FileUpload from './abis/FileUpload.json';

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
// decode data input
const InputDataDecoder = require('ethereum-input-data-decoder');
const decoder = new InputDataDecoder(FileUpload.abi);
const api = require('etherscan-api').init('K1BD9Z7AN6RAVGC7E6KFJYDMEFMY9FMEED', 'ropsten', '3000');

class MainPage extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    
  }

  async loadBlockchainData() {
    // sessionStorage.setItem('account', accounts[0])
    var id = await window.web3.eth.net.getId()
    var data = await FileUpload.networks[id]
    // console.log(data) => address contract, txHash
    if(!data) {
      window.alert('Smart contract not deployed to detected network')
    } else {
      this.setState({ loading: false })
    }
  }

  constructor(props) {
    super(props);
    this.state = { 
      account: '',
      fileName: '',
      buffer: null,
      fileHash: '',
      ipfsHash: '',
      inputTransaction: '',
      transactionHash: '',
      fileSuccess: "true",
      isDuplicateFile: false,
      loading: true,
      listIpfsHash: []
    };
  }

  async loadWeb3() {
    if(window.ethereum) {
      // ket noi web3 với trình duyệt
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      
      // lấy tài khoản từ blockchain
      const accounts = await window.web3.eth.getAccounts()
      this.setState({ account: accounts[0]})
    } if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Nếu bạn muốn tải lên tài liệu, hãy sử dụng tiện ích MetaMask của Chrome để kết nối với mạng lưới BlockChain!')
      this.setState({loading: false})
    }
  }
  
  // Example hash: "QmdrbUvQmC1MT6SRNoFNw7gucp8w4QrVXRpdTWgx5yqNJ3"
  // Example url: https://ipfs.infura.io/ipfs/QmeoBEv7jkhXYKbSFPmj2CXzH4iqYso7p1jQDBGut6qeZB
  
  onSubmit = async (event, name, file) => {
    event.preventDefault();
    if(this.state.account) {
      console.log('Submitingg ...');
      // console.log(name, file)
      this.setState({fileName: name})
      window.alert('Chờ 1 chút trong quá trình tải dữ liệu lên BlockChain, khi dữ liệu đã lưu hãy hoàn tất quá trình tải lên trong hộp thoại mở lên MetaMask')
      ipfs.add(file, async (error, result) => {
        // console.log('IPFS result', result)
        if(!result) return window.alert('Máy chủ đang bận, xin vui lòng thử lại!')
        const ipfsHash = result[0].hash;
        this.setState({ipfsHash});
        if(!ipfsHash) {
          window.alert('Máy đang chủ bận, xin vui lòng thử lại ...')
        }
        if(error) {
          console.log(error);
          return
        }

        // Check Duplicate Files Upload
        // list ipfs hash from data result
        await fetch(`http://localhost:3001/api/posts/get`, {
          method: 'GET',
        })
          .then(res => res.json())
          .then(data => {
            // console.log(data)
            // console.log(data.data[0])
            for(let i=0; i<data.data.length; i++) {
              this.setState({
                listIpfsHash: [
                  ...this.state.listIpfsHash,
                  data.data[i].ipfsHash
                ]
              })
            }
          })
          .catch(error => console.log(error))
        console.log(this.state.listIpfsHash)
        this.state.listIpfsHash.map(async (item) => {
          // console.log(item)
          if(ipfsHash === item) {
            return this.setState({isDuplicateFile: true})
          }
        })
        if(this.state.isDuplicateFile === true) {
          this.setState({
            listIpfsHash: [],
            isDuplicateFile: false
          })
          return (
            window.alert('Tệp tài liệu đã được tải lên ... xin chọn tệp tài liệu khác!')
          )
        } else {
            // Store file on the BlockChain
            localStorage.setItem('upload', 'success');
            const web3 = window.web3;
            const networkId = await web3.eth.net.getId();
            const networkData = FileUpload.networks[networkId];
            const abi = FileUpload.abi;
            const address = networkData.address;
            const contract = web3.eth.Contract(abi, address);
            await contract.methods.set(ipfsHash).send({ from: this.state.account})
              // .then(r => {
              //   // this.setState({ transactionHash: r.transactionHash });
              //   console.log(r.transactionHash)
              // });

            console.log('tesstrerererer')
        }
        window.alert('Tài liệu đã tải lên thành công')
        
      })
    }
  }
  // ket noi du lieu voi server
  onLoadDataDownload = async () => {
    console.log('Successs!');
    // const getBlockTransaction = await window.web3.eth.getTransactionFromBlock('latest');
    // console.log(getBlockTransaction.hash) => tx Hash moi nhat
    // get last transaction from account
    var txlist = api.account.txlist(this.state.account, 1, 'latest', 1, 100, 'asc')
    await txlist.then((result) => {
      // console.log(result)
      console.log(result.result[result.result.length - 1].hash)
      var transactionHash = result.result[result.result.length - 1].hash
      this.setState({transactionHash})
      window.localStorage.setItem('fileName', this.state.fileName)
      window.localStorage.setItem('transactionHash', transactionHash)
       
    })
    // Save to database
    await fetch(`http://localhost:3001/api/posts`, {
      method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fileName: this.state.fileName,
            transactionHash: this.state.transactionHash,
            ipfsHash: this.state.ipfsHash
        })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }


  // ket noi du lieu voi server
  handleOnclick = async (file) => {
    // console.log(file) // ==> transactionHash
    if(file) {
      await window.web3.eth.getTransaction(file).then(result => {
        if(result) {
          this.setState({inputTransaction: result.input, fileSuccess: "true"})
          console.log(result)
          
          const resultDecoder = decoder.decodeData(this.state.inputTransaction)
          if(resultDecoder.inputs[0] !== undefined) {
            this.setState({ fileHash: resultDecoder.inputs[0]})
            console.log('link anh: ', this.state.fileHash)
          }
          fetch(`http://localhost:3001/api/posts/get/${file}`, {
            method: 'GET'
          })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              this.setState({
                fileName: data.data.fileName,
                createdAt: data.data.createdAt
              })
            })
            .catch(e => console.log(e))

        }else {
          // return window.alert('file cong chung sai')
          this.setState({ fileSuccess: "false" })
          console.log('file cong chung sai')
        }
      })
    } else {
      window.alert('Xin hãy chọn tài liệu để kiểm tra!')
    }
  }

  //tao trang web html
  render() {

    return (
      <div className="App">
        <NavBar account={this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-12">
              {this.state.loading ? (
                <div className="spinner-border text-warning" style={{width: "3rem", height: "3rem", marginTop: "300px"}} role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : 
                <MainContent 
                  handleOnclick={this.handleOnclick} 
                  handleOnsubmit={this.onSubmit}
                  onLoadDataDownload={this.onLoadDataDownload}
                  fileHash={this.state.fileHash}
                  fileSuccess={this.state.fileSuccess}
                  fileName={this.state.fileName}
                  createdAt={this.state.createdAt}
                />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage
