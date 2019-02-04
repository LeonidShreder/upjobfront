import React from 'react';
import Button from "antd/es/button/button";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Input from "antd/es/input/Input";
import Form from "antd/es/form/Form";
import {message} from "antd/lib/index";
import ApiRequest from "../../../ApiRequest";
import Global from "../../global.js";
import Validator from "../../validators";
import {UserProfile} from "../UserProfile";


export class UserProfileEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          toEdit: false,
          user_email: '',
          user_password: '',
          user_full_name: '',
          user_phone_number: '',
          user_role: '',
        };
    }

    onEditClick = () => {
        this.setState({
           toEdit: true,
        });
    };

    onSaveChangesClick = (user_email, user_password, user_confirm_password,
                 user_full_name, user_phone_number) => {
        const userProfile = {
            email: user_email,
            password: user_password,
            full_name: user_full_name,
            phone_number: user_phone_number,
        };
        if (Validator.validateData(this.state.user_email,
            this.state.user_phone_number,
            this.state.user_password,
            user_confirm_password)){
            let id = JSON.parse(localStorage.getItem("currentUser"));
            ApiRequest.put(Global.HOST + Global.PORT + 'userprofiles/' + id,
                userProfile)
                .then((response) => this.setState({
                    toEdit: false,
                    user_email: response['email'],
                    user_full_name: response['full_name'],
                    user_phone_number: response['phone_number'],
                    user_role: response['role'],
                    user_password: response['password'],}))
                .catch(error => message.error(error));
        }
    };

    componentDidMount = () => {
        ApiRequest.get(Global.HOST + Global.PORT + 'userprofiles/' + JSON.parse(localStorage.getItem('currentUser')))
            .then((response) => {
                this.setState({
                    user_email: response['email'],
                    user_full_name: response['full_name'],
                    user_phone_number: response['phone_number'],
                    user_role: response['role'],
                    user_password: response['password'],
                })
            })
            .catch(error => console.log(error));
    };

    render () {
        if (!this.state.toEdit) {
            return (
                <div style={{textAlign: 'center', paddingTop: '2em'}}>
                    <Row>
                        <Col span={6}/>
                        <Col span={6}><h3 align="left">Email:</h3></Col>
                        <Col span={6}><h3
                            align="left">{this.state.user_email}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}/>
                        <Col span={6}><h3 align="left">Full name:</h3></Col>
                        <Col span={6}><h3
                            align="left">{this.state.user_full_name}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}/>
                        <Col span={6}><h3 align="left">Phone number:</h3></Col>
                        <Col span={6}><h3
                            align="left">{this.state.user_phone_number}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}/>
                        <Col span={6}><h3 align="left">Role:</h3></Col>
                        <Col span={6}><h3
                            align="left">{this.state.user_role}</h3>
                        </Col>
                    </Row>
                    <Button type="primary" onClick={this.onEditClick}>
                        Edit</Button>
                </div>
            )
        } else {
            return (
                <UserProfile onClick={this.onSaveChangesClick}
                             email={this.state.user_email}
                             password={this.state.user_password}
                             full_name={this.state.user_full_name}
                             phone_number={this.state.user_phone_number}
                             button_name='Save changes'/>
            )
        }
    }
}
