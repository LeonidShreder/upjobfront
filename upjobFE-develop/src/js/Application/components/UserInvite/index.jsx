import React from "react";
import {SingleUserInvite} from "../SingleUserInvite";
import CardVacancyOrEmployee from "../CardVacancyOrEmployee";
import ApiRequest from "../../../ApiRequest";
import Global from "../../global";
import Validator from "../../validators";
import {message, Button, Input, Form} from "antd";


export class UserInvite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_list: [<SingleUserInvite key={1}
                                          onEmailChange={this.onEmailChange}
                                          onRoleChange={this.onRoleChange}/>],
            current_key: 2,
            user_list_state: {1: {email: '', role: ''}}
        }
    }

    onAdd = () => {
      let user_list = this.state.user_list;
      let current_key = this.state.current_key;
      let user_list_state = this.state.user_list_state;
      user_list.push(<SingleUserInvite key={this.state.current_key}
                                       onEmailChange={this.onEmailChange}
                                       onRoleChange={this.onRoleChange}/>);
      user_list_state[current_key] = {email: '', role: ''};
      current_key += 1;
      this.setState({
          user_list: user_list,
          current_key: current_key,
          user_list_state: user_list_state,
      })
    };

    onEmailChange = (key, email) => {
        this.state.user_list_state[key]['email'] = email;
    };

    onRoleChange = (key, role) => {
        this.state.user_list_state[key]['role'] = role;
    };

    onInviteClick = () => {
        let is_emails_are_valid = true;
        for (const [key, value] of Object.entries(this.state.user_list_state)) {
            if (!Validator.validateEmail(value['email'])){
                message.error(value['email'] + ' is not valid.');
                is_emails_are_valid = false;
                break;
            }
        }
        if (is_emails_are_valid) {
            ApiRequest.post(Global.HOST + Global.PORT + 'invite_user',
                {user_list: this.state.user_list_state, company_id: JSON.parse(localStorage.getItem('company_id'))})
                .catch(error => message.error(error));
        }
    };

    render() {
        let output_user_list = this.state.user_list.map((entity) => {
            return entity
        });
        return (
            <div style={{textAlign: 'left'}}>
                <h3 align="center">Invite users</h3>
                {output_user_list}
                <Button onClick={this.onAdd}  style={{margin: '0em 3em'}} type="primary">Add one more user</Button>
                <Button onClick={this.onInviteClick}  style={{margin: '0em 3em'}} type="primary">Invite</Button>
            </div>
        )
    }
}