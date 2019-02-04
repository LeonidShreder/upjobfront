import {message} from "antd";

class Validator {

    validateEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    validatePhoneNumber = (phoneNumber) => {
        try {
        const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
        let number = phoneUtil.parse(phoneNumber);
        return phoneUtil.isValidNumber(number);
        } catch (e) {

        }
    };

    validateData = (email, phoneNumber, password='123123123', confirm_password='123123123') => {
        if (!this.validateEmail(email)) {
            message.error("This email is not valid.");
            return false;
        } else if(password.length < 8){
            message.error("Password should contain no less then 8 characters.");
            return false;
        } else if (password !== confirm_password) {
            message.error("Password is not confirmed.");
            return false;
        } else if(!this.validatePhoneNumber(phoneNumber)) {
            message.error("This phone number is not valid.");
            return false;
        }
        return true;
    };
}

export default (new Validator);
