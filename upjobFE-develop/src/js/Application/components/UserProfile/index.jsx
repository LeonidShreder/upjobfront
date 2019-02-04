import {Button, Col, Form, Input, Row} from "antd";
import React from "react";

export class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          user_email: this.props.email,
          user_password: this.props.password,
          user_password_confirm: this.props.password,
          user_full_name: this.props.full_name,
          user_phone_number: this.props.phone_number,
        };
    }

    onUserEmailChange = (e) => {
        this.setState({
            user_email: e.target.value,
        });
    };

    onUserPasswordChange = (e) => {
        this.setState({
            user_password: e.target.value,
        });
    };

    onUserPasswordConfirmChange = (e) => {
        this.setState({
            user_password_confirm: e.target.value,
        });
    };

    onUserFullNameChange = (e) => {
        this.setState({
            user_full_name: e.target.value,
        });
    };

    onUserPhoneNumberChange = (e) => {
        this.setState({
            user_phone_number: e.target.value,
        });
    };

    onClick = () => {
        this.props.onClick(this.state.user_email, this.state.user_password,
            this.state.user_password_confirm, this.state.user_full_name,
            this.state.user_phone_number)
    };

    render() {
        return (
            <Form>
                <h1 align="center">User profile</h1>
                <Row style={{padding: '1em'}}>
                    <Col span={6} offset={9}>
                        <Input
                            placeholder="E-mail"
                            value={this.state.user_email}
                            onChange={this.onUserEmailChange}
                        />
                    </Col>
                </Row>
                <Row style={{padding: '1em'}}>
                    <Col span={6} offset={9}>
                      <Input
                        placeholder="Password"
                        type="password"
                        value={this.state.user_password}
                        onChange={this.onUserPasswordChange}
                      />
                    </Col>
                </Row>
                 <Row style={{padding: '1em'}}>
                    <Col span={6} offset={9}>
                      <Input
                        placeholder="Confirm password"
                        type="password"
                        value={this.state.user_password_confirm}
                        onChange={this.onUserPasswordConfirmChange}
                      />
                    </Col>
                </Row>
                <Row style={{padding: '1em'}}>
                    <Col span={6} offset={9}>
                      <Input
                        placeholder="Full name"
                        value={this.state.user_full_name}
                        onChange={this.onUserFullNameChange}
                      />
                    </Col>
                </Row>
                <Row style={{padding: '1em'}}>
                    <Col span={6} offset={9}>
                      <Input
                        placeholder="Phone number"
                        value={this.state.user_phone_number}
                        onChange={this.onUserPhoneNumberChange}
                      />
                    </Col>
                </Row>
                <Row style={{padding: '1em'}}>
                    <Col span={6} offset={9}>
                      <Button type="primary" htmlType="button"
                              onClick={this.onClick}>{
                                  this.props.button_name}</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

