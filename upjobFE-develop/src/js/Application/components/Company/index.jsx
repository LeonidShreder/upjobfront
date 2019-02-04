import {Button, Col, Form, Input, Row, Select} from "antd";
import React from "react";
import ApiRequest from "../../../ApiRequest";
import Global from "../../global";
import CardVacancyOrEmployee from "../CardVacancyOrEmployee";
import './style.css';

const Option = Select.Option;

export class Company extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          company_title: this.props.title,
          company_address: this.props.address,
          company_description: this.props.description,
          company_size_range: this.props.company_size_range,
          company_phone_number: this.props.phone_number,
          company_email: this.props.email,
          entities: [],
        };
    }

    onCompanyTitleChange = (e) => {
        this.setState({
            company_title: e.target.value,
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

    onCompanySizeRangeChange = (value) => {
        this.setState({
            company_size_range: value,
        });
    };

    onCompanyPhoneNumberChange = (e) => {
        this.setState({
            company_phone_number: e.target.value,
        });
    };

    onCompanyEmailChange = (e) => {
        this.setState({
            company_email: e.target.value,
        });
    };

    onSubmit = () => {
      this.props.onSubmit(this.state.company_title,
          this.state.company_address, this.state.company_description,
          this.state.company_phone_number,
          this.state.company_size_range, this.state.company_email)
    };

    componentDidMount = () => {
        ApiRequest.get(Global.HOST + Global.PORT + 'ranges')
            .then((response) => {
                this.setState({entities: response})
            })
            .catch(error => console.log(error));
    };

    render () {
        let entities_list = this.state.entities.map((entity) => {
            return <Option value={entity.id}>{entity.size_value}</Option>
        });
        return (
            <Form>
              <h1 style={{textAlign: 'center'}}>Company</h1>
                <table className={"tableEditAboutCompany"}>
                        <tr className={"titleEditAbout"}>
                            <td>Company Title</td>
                            <td>Address</td>
                            <td>Description</td>
                            <td>Phone Number</td>
                            <td>Company Size</td>
                            <td>Company email</td>
                        </tr>
                        <tr className={"bodyEditAbout"}>
                            <td><Input
                                    placeholder="Title"
                                    value={this.state.company_title}
                                    onChange={this.onCompanyTitleChange}
                                  /></td>
                            <td><Input
                                    placeholder="Address"
                                    value={this.state.company_address}
                                    onChange={this.onCompanyAddressChange}
                                  /></td>
                            <td><Input.TextArea
                                    placeholder="Description"
                                    rows="5"
                                    value={this.state.company_description}
                                    onChange={this.onCompanyDescriptionChange}
                                  /></td>
                            <td><Input
                                    placeholder="Phone number"
                                    value={this.state.company_phone_number}
                                    onChange={this.onCompanyPhoneNumberChange}
                                  /></td>
                            <td><Select placeholder="Company size"
                                  defaultValue={this.state.company_size_range}
                                  onChange={this.onCompanySizeRangeChange}>
                              {entities_list}</Select>
                            </td>
                            <td><Input
                                    placeholder="E-mail"
                                    value={this.state.company_email}
                                    onChange={this.onCompanyEmailChange}
                                  /></td>
                        </tr>
                    </table>
                  <Button type="primary" size="large" htmlType="button"
                          onClick={this.onSubmit}>{
                                  this.props.button_name}</Button>
            </Form>
        )
    }
}
