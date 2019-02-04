import {Button, Col, Form, Input, Row, Select} from "antd";
import React from "react";
import ApiRequest from "../../../ApiRequest";
import Global from "../../global";

const Option = Select.Option;

export class SingleUserInvite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entities: [],
            user_email: '',
            user_role: '',
        }
    }

    componentDidMount = () => {
        ApiRequest.get(Global.HOST + Global.PORT + 'roles')
            .then((response) => {
                this.setState({entities: response})
            })
            .catch(error => console.log(error));
    };

    onUserEmailChange = (e) => {
        this.setState({
           user_email: e.target.value,
        });
        this.props.onEmailChange(this._reactInternalFiber.key,
                                 e.target.value);
    };

    onUserRoleChange = (value) => {
        this.setState({
           user_role: value,
        });
        this.props.onRoleChange(this._reactInternalFiber.key, value);
    };

    render() {
        let entities_list = this.state.entities.map((entity) => {
            return <Option value={entity.id}>{entity.value}</Option>
        });
        return (
            <div align="center">
                <Form>
                    <Row style={{padding: '1em'}}>
                        <Col span={6} style={{margin: '0em 1em'}}>
                            <Input
                                placeholder="E-mail"
                                value={this.state.user_email}
                                onChange={this.onUserEmailChange}
                            />
                        </Col>
                        <Col span={6} style={{margin: '0em 1em'}}>
                            <Select placeholder="Role"
                                onChange={this.onUserRoleChange}>
                                {entities_list}
                            </Select>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}