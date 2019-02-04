import {Button, Col, Form, Input, Row, Select} from "antd";
import React, {Component} from "react";
import { Route , withRouter} from 'react-router-dom';
import {message} from "antd/lib/index";
import ApiRequest from "../../../ApiRequest";
import Global from "../../global.js";
import Validator from "../../validators";
import {UserProfile} from "../UserProfile";
import {Company} from "../Company";
import './style.css';

export class CompanyEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toEdit: false,
            company_title: '',
            company_address: '',
            company_description: '',
            company_phone_number: '',
            company_size: '',
            company_email: '',
        };
    }

    onCompanyTitleChange = (e) => {
        this.setState({
            company_title: e.target.value
        });
    };

    onCompanyAddressChange = (e) => {
        this.setState({
            company_address: e.target.value,
        });
    };

    onCompanyDescriptionChange = (e) => {
        this.setState({
            company_description: e.target.value,
        });
    };

    onCompanyPhoneChange = (e) => {
        this.setState({
            company_phone_number: e.target.value,
        });
    };
    onCompanySizeChange = (e) => {
        this.setState({
            company_size: e.target.value,
        });
    };

    onEditClick = () => {
        this.setState({
            toEdit: true,
        });
    };


    componentDidMount = () => {
        ApiRequest.get(Global.HOST + Global.PORT + 'companies/' +JSON.parse(localStorage.getItem('company_id')))
            .then((response) => {
                this.setState({
                    company_title: response['title'],
                    company_address: response['address'],
                    company_description: response['description'],
                    company_phone_number: response['phone_number'],
                    company_size: response['size'],
                    company_email: response['email'],
                })
            })
            .catch(error => console.log(error));
    };

    onSaveChangesClick = (company_title, company_address, company_description,
                          company_phone_number, company_size, company_email) => {
        const companyProfile = {
            title: company_title,
            address: company_address,
            description: company_description,
            phone_number: company_phone_number,
            size_range_id : company_size,
            email : company_email,
         };
        ApiRequest.put(Global.HOST + Global.PORT + 'companies/' + JSON.parse(localStorage.getItem('company_id')),
                companyProfile)
                .then((response) => this.setState({
                    toEdit: false,
                    company_title: response['title'],
                    company_address: response['address'],
                    company_description: response['description'],
                    company_phone_number: response['phone_number'],
                    company_size: response['size'],}))
                .catch(error => message.error(error));

    };

    render() {
        if (!this.state.toEdit) {
            return (
                <div style={{textAlign: 'center', paddingTop: '2em'}}>
                    <table className={"tableAboutCompany"}>
                        <tr className={"titleAbout"}>
                            <td>Company Title</td>
                            <td>Address</td>
                            <td>Description</td>
                            <td>Phone Number</td>
                            <td>Company Size</td>
                        </tr>
                        <tr className={"bodyAbout"}>
                            <td>{this.state.company_title}</td>
                            <td>{this.state.company_address}</td>
                            <td>{this.state.company_description}</td>
                            <td>{this.state.company_phone_number}</td>
                            <td>{this.state.company_size}</td>
                        </tr>
                    </table>
                    <Button type="primary" size="large" onClick={this.onEditClick}>
                        Edit</Button>
                </div>
            )
        } else {
            return (
                  <Company onSubmit={this.onSaveChangesClick}
                             title={this.state.company_title}
                             address={this.state.company_address}
                             description={this.state.company_description}
                             phone_number={this.state.company_phone_number}
                             company_size={this.state.company_size}
                             email = {this.state.company_email}
                             button_name='Save changes'/>
            )
        }
    }
}
