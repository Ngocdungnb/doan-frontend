import React, { Component } from "react";
import { Result, Button, Icon, Typography } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
const { Paragraph } = Typography;


export default class CheckResult extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.setState({isLoading: false})
        }, 10000);
        
    }
    state = {
        isLoading: true
    }
    render() {
        return (
            <div>
                {this.props.fileSuccess === "true" ? (
                    (this.state.isLoading ? (
                        <div className="spinner-border text-light" style={{width: "3rem", height: "3rem", marginTop: "20%"}} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        <div style={{backgroundColor: "white"}}>
                            <Result
                                status="success"
                                title="Tài liệu của bạn đã được kiểm chứng !"
                                extra={
                                    <Link to='/'>
                                        <Button type="primary" key="console">
                                            Về trang chính
                                        </Button>
                                    </Link>
                                }
                            >
                                <div>
                                    <div className="text-center mb-3">
                                        <img style={{width: "50%", display: "inline"}} src={`https://ipfs.infura.io/ipfs/${this.props.fileHash}`} alt="img" />
                                    </div>
                                    <h3>Thông tin của bạn</h3>
                                    <h6>{this.props.fileName}</h6>
                                    <h6>Ngày tạo: {this.props.createdAt}</h6>
                                </div>
                            </Result>
                        </div>
                    ))
                ) : (
                    (this.state.isLoading ? (
                        <div className="spinner-border text-light" style={{width: "3rem", height: "3rem"}} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        <div style={{backgroundColor: "white"}}>
                            <Result
                                status="error"
                                title="Tài liệu chưa được công chứng"
                                extra={
                                    <Link to='/'>
                                        <Button type="primary" key="console">
                                            Về trang chính
                                        </Button>
                                    </Link>
                                }
                            >
                                <div>
                                <Paragraph>
                                    <Icon style={{color:"red"}} type="close-circle" />Tài liệu của bạn chưa được xác thực
                                </Paragraph>
                                <Paragraph>
                                <Icon style={{color:"red"}} type="close-circle" />Liên hệ với người có chức năng để có tài liệu được kiểm chứng
                                </Paragraph>
                                </div>
                            </Result>
                        </div>
                    ))
                ) }
            </div>
        );
    }
}

