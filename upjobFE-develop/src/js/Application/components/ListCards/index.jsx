import {Row, Col} from 'antd';
import React, {Component} from 'react';
import CardVacancyOrEmployee from '../CardVacancyOrEmployee';
import ApiRequest from '../../../ApiRequest';
import FilterListCategory from '../FilterListCategory';
import FilterListProfession from '../FilterListProfession'
import Global from "../../global.js";
import './style.css';

export class EmployeesListCards extends React.Component {
    render() {
        return (
            <ListCards for={"employees"}/>
        );
    }
}


export class VacanciesListCards extends React.Component {
    render() {
        return (
            <ListCards for={"vacancies"}/>
        );
    }
}

export class ListCards extends Component {
    constructor(props) {
        super(props);
        this.onProfessionChange = this.onProfessionChange.bind(this);
        this.onTechnologyChange = this.onTechnologyChange.bind(this);
        this.state = {
            entities: [],
            value: new URLSearchParams(window.location.search)
                        .get('value'),
            addedProfessions: [new URLSearchParams(window.location.search)
                        .get('value')],
            addedTechnologies: [],
        }
    };

    entityRequest = () => {
        ApiRequest.get(Global.HOST + Global.PORT + this.props.for,
                    {value: this.state.addedProfessions, technologies: this.state.addedTechnologies, is_activated: 'True'})
        .then((response) => {
            this.setState({entities: response})
        })
        .catch(error => console.log(error));
    };

    onProfessionChange = (addedProfession) => {
        let professionList = this.state.addedProfessions
        if (addedProfession[0]) {
            professionList.push(addedProfession[1])
        } else {
            professionList.splice(professionList.indexOf(addedProfession[1]),1)
        }
        this.setState({addedProfessions: professionList})
        this.entityRequest()
    }

    onTechnologyChange = (addedTechnology) => {
        let technologyList = this.state.addedTechnologies
        if (addedTechnology[0]) {
            technologyList.push(addedTechnology[1])
        } else {
            technologyList.splice(technologyList.indexOf(addedTechnology[1]),1)
        }
        this.setState({addedTechnologies: technologyList})
        this.entityRequest()
    }

    componentDidMount = () => {
        this.entityRequest()
    };

    render() {
        let entities_list = this.state.entities.map((entity) => {
            return <CardVacancyOrEmployee entity={entity} key={entity.id}/>
        });
        return (
            <div style={{textAlign: 'center'}} className={"ListCards"}>
                <Row>
                    <Col span={4} className={"ListCards-filters"}>
                        <FilterListProfession onProfessionChange={this.onProfessionChange} addedProfessions={this.state.addedProfessions}/>
                        <FilterListCategory onTechnologyChange={this.onTechnologyChange}/>
                    </Col>
                    <Col span={20} className={"ant-row ListCards-entities"}>
                        {entities_list}
                    </Col>
                </Row>
            </div>
        )
    }
}
