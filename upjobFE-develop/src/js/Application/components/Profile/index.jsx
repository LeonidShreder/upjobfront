import React from 'react';
import { Radio, Col, Row } from 'antd';
import {UserProfileEdit} from "../UserProfileEdit";
import {CompanyEdit} from "../CompanyEdit";
import {UserInvite} from "../UserInvite";
import {SlotsManagement} from "../SlotsManagement";
import { Menu, Icon, Button } from 'antd';

const SubMenu = Menu.SubMenu;


export class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            param: 1,
        }
    }

    onChangeOption = (e) => {
        this.setState({
            param: e.target.value,
        })
    };

    renderOption(param) {
        switch (param){
            case '4':
                return <UserProfileEdit/>;
            case '3':
                return <CompanyEdit/>
            case '2':
                return <UserInvite/>
            case '1':
                return <SlotsManagement/>
        }
    }

  render() {
    return (
      <div className={"ProfileClass"}>
        <Row>
          <Col span={6} className="column_side">
              <Radio.Group defaultValue="1" onChange={this.onChangeOption}>
                    <Radio.Button value="1" className="profile_button">Edit slots</Radio.Button>
                    <Radio.Button value="2" className="profile_button">Invite user</Radio.Button>
                    <Radio.Button value="3" className="profile_button">Edit company</Radio.Button>
                    <Radio.Button value="4" className="profile_button">Edit profile</Radio.Button>
              </Radio.Group>
          </Col>
          <Col span={18} className="column_middle">
              {this.renderOption(this.state.param)}
          </Col>
        </Row>
      </div>
    )
  }
}
