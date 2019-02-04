import React from 'react'
import ApiRequest from '../../../ApiRequest';
import { Switch } from 'antd'
import Global from "../../global.js";


export class CardVacancyOrEmployeeSmall extends React.Component {
    constructor(props) {
        super(props)
    }

    onChange = (checked) => {
        let cardType
        let flag
        this.props.entity.public_id ? cardType = 'employee' : cardType = 'vacancy'
        this.props.entity.is_activated === "True" ? flag="False" : flag="True"
        let data = {'id': this.props.entity.id, 'is_activated': flag}
        ApiRequest.put(Global.HOST + Global.PORT + cardType, data)
            .then((response) => {
                this.props.changeActivationStatus(response, cardType, flag);
                this.checked = !this.checked
            })
            .catch(error => console.log(error));
    }

    render() {
        let entity = this.props.entity;
        let entityActivated;
        entity.is_activated==='True' ? entityActivated = true : entityActivated = false
        return(
            <div className={"VacancyCard"}>
                <div>
                    <CompanyAvatar/>
                    {(entity.full_name) ? (
                        <h4>{entity.full_name} / {entity.public_id}</h4>) : (
                        <div></div>)}
                    <h5>{entity.title}</h5>
                </div>
                <hr/>
                <div>
                      <span>{entity.profession}</span>
                </div>
                <hr/>
                <div>
                    <div>
                        <Switch checked={entityActivated} onChange={this.onChange} entity={this.props.entity} />
                    </div>
                </div>
            </div>
        );
    }
};

function CompanyAvatar(props) {
    let imgUrl = props.url || "https://placeimg.com/200/200/animals";
    let alt = props.alt;

    return (
        <div className="CompanyAvatar">
            <img src={imgUrl} alt={alt}/>
        </div>
    )
};

export default CardVacancyOrEmployeeSmall
