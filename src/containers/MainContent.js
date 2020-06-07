import React from 'react';
import { MDBMask, MDBRow, MDBCol, MDBView, MDBContainer } from 'mdbreact';
import '../css/maincontent.css';
import DropFile from '../component/DropFile';
import CreateFile from '../component/CreateFile';
import { BrowserRouter, Route } from 'react-router-dom';
import CheckResult from '../component/CheckResult';

class MainContent extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route exact path='/' render={(props) => <DropFile {...props} handleOnclick={this.props.handleOnclick}/>} />
                    <Route path='/create-file' render={(props) => <CreateFile {...props} handleOnsubmit={this.props.handleOnsubmit} onLoadDataDownload={this.props.onLoadDataDownload}/>} />
                    {/* {this.props.fileHash ? <Route patch='/result' render={(props) => <Result {...props} fileHash={this.props.fileHash}/>} /> : null} */}
                    <Route path='/result' render={(props) => <CheckResult {...props} fileSuccess={this.props.fileSuccess} fileHash={this.props.fileHash} fileName={this.props.fileName} createdAt={this.props.createdAt}/>} />
                </BrowserRouter>
            </div>
        );
    }
}

export default MainContent;