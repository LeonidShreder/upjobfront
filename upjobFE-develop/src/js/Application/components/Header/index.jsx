import React from "react";
import {Icon} from 'antd';

export class Header extends React.Component {
    onLogOutClick = () => {
        localStorage.removeItem("currentUser");
        window.location = '/';
    }

    render() {
        if (localStorage.getItem("currentUser")) {
            return (
                <div className="d-flex flex-column flex-md-row
                                align-items-center p-3 px-md-4 mb-3 bg-white
                                border-bottom box-shadow sticky">
                    <a href="/" className="my-0 mr-md-auto font-weight-normal">
                        <h5>Upjob</h5>
                    </a>
                    <a className="btn btn-outline-primary" href="profile">
                        <Icon type="user" /> Profile
                    </a>
                    <button type="button" className="btn btn-outline-primary"
                            onClick={this.onLogOutClick}>Log out
                    </button>
                </div>
            )
        } else {
            return (
            <div className="d-flex flex-column flex-md-row align-items-center
                            p-3 px-md-4 mb-3 bg-white border-bottom box-shadow
                            sticky">
                <a href="/" className="my-0 mr-md-auto font-weight-normal">
                    <h5>Upjob</h5>
                </a>
                <a className="btn btn-outline-primary" href="signup">Sign up</a>
                <a className="btn btn-outline-primary" href="signin">Sign in</a>
            </div>
            )
        }
    }
}
