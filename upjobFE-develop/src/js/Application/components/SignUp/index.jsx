import React from 'react';
import {Tabs, message} from 'antd';
import ApiRequest from '../../../ApiRequest';
import Global from "../../global.js";
import Validator from "../../validators";
import {UserProfile} from "../UserProfile";
import {Company} from "../Company";


const TabPane = Tabs.TabPane;

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true,
      activePage: "1",
      user_email: '',
      user_password: '',
      user_full_name: '',
      user_phone_number: '',
    };
  }

  onNextClick = (user_email, user_password, user_confirm_password,
                 user_full_name, user_phone_number) => {
    const user_profile = {
      email: user_email,
    };
    if (Validator.validateData(user_email, user_phone_number, user_password,
        user_confirm_password)){
      ApiRequest.get(Global.HOST + Global.PORT + 'userprofiles', user_profile)
          .then((response) => this.validateUserProfile(response, user_email,
                  user_password, user_full_name, user_phone_number))
          .catch(error => console.log(error));
    }
  };

  validateUserProfile = (response, user_email, user_password, user_full_name,
                         user_phone_number) => {
    if (response.length === 0){
          this.setState({
              status: false,
              activePage: "2",
              user_email: user_email,
              user_password: user_password,
              user_full_name: user_full_name,
              user_phone_number: user_phone_number,
          });
    } else {
      message.error('This email for user profile is already used.');
    }
  };

  onSubmit = (company_title, company_description, company_address, company_email,
              company_phone_number, company_size_range) => {
    const company = {
      title: company_title,
      address: company_address,
      description: company_description,
      size_range_id: company_size_range,
      phone_number: company_phone_number,
      email: company_email,
    };
      if (Validator.validateData(company_email, company_phone_number)){
         ApiRequest.post(Global.HOST + Global.PORT + 'companies', company)
        .then((response) => this.createUserProfile(response))
        .catch(error => message.error(error));
      }
    };

  createUserProfile = (response) => {
    const user_profile = {
      email: this.state.user_email,
      password: this.state.user_password,
      full_name: this.state.user_full_name,
      phone_number: this.state.user_phone_number,
      role_id: 2,
      company_id: response['id'],
    };
    ApiRequest.post(Global.HOST + Global.PORT + 'userprofiles', user_profile)
        .then((response) => localStorage.setItem('currentUser', JSON.stringify(response['id'])),
            localStorage.setItem('company_id', JSON.stringify(response['company_id'])))
        .then(() => window.location = '/')
        .catch(error => console.log(error));
  };

  render() {
    return (
      <div style={{textAlign: 'center', paddingTop: '2em'}}>
          <h1>Sign Up</h1>
        <Tabs activeKey={this.state.activePage}>
          <TabPane tab="User profile" key="1">
            <UserProfile onClick={this.onNextClick}
                         email=''
                         password=''
                         full_name=''
                         phone_number=''
                         button_name='Next'/>
          </TabPane>
          <TabPane tab="Company" disabled={this.state.status} key="2">
            <Company onSubmit={this.onSubmit}/>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
