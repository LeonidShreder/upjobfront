import React from 'react';
import {Form, Button, Input, Icon, Row, Col, message} from 'antd';
import ApiRequest from "../../../ApiRequest";
import Global from "../../global.js";

export class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onEmailChange = (e) => {
    this.setState({
        email: e.target.value,
    });
  };

  onPasswordChange = (e) => {
    this.setState({
        password: e.target.value,
    });
  };

  checkValidations = (response) => {
    if (response.length === 0){
      message.error("Invalid email or password, try again.");
    } else {
      localStorage.setItem("currentUser", JSON.stringify(response[0]['id']));
      localStorage.setItem("company_id", JSON.stringify(response[0]['company_id']));
      window.location = '/';
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    ApiRequest.get(Global.HOST + Global.PORT + 'userprofiles', user)
        .then((response) => this.checkValidations(response))
        .catch((error) => console.log(error));
  };

  render() {
    return (
      <div style={{textAlign: 'center', paddingTop: '2em'}}>
        <Form onSubmit={this.onSubmit}>
          <h1>Sign In</h1>
          <Row style={{padding: '1em'}}>
            <Col span={6} offset={9}>
              <Input
                placeholder="Enter your username"
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                value={this.state.email}
                onChange={this.onEmailChange}
              />
            </Col>
          </Row>
          <Row style={{padding: '1em'}}>
            <Col span={6} offset={9}>
              <Input
                placeholder="Enter your password"
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                type="password"
                value={this.state.password}
                onChange={this.onPasswordChange}
              />
            </Col>
          </Row>
          <Row style={{padding: '1em'}}>
            <Col span={6} offset={9}>
              <Button type="primary" htmlType="submit">Sign In</Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}
