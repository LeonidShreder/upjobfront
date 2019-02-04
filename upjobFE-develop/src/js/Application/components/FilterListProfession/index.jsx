import React, {Component} from 'react'
import FilterProfession from '../FilterProfession'
import ApiRequest from '../../../ApiRequest';
import Accordion from 'react-collapsy';
require('../../../../../node_modules/react-collapsy/lib/index.css');

export default class FilterListProfession extends Component {
    constructor(props){
        super(props)
        this.state={
            professions: [],
        }
    }

    componentDidMount(){
        ApiRequest.get('http://localhost:5000/professions')
        .then((response) => {return this.setState({professions: response})})
        .catch(error => console.log(error));
    }

    render(){
        let profession_list = this.state.professions.map((profession) =>{
            return <FilterProfession profession={profession} key={profession.id} onProfessionChange={this.props.onProfessionChange} addedProfessions={this.props.addedProfessions}/>});

        return(
            <Accordion title='Profession'>
                    {profession_list}
            </Accordion>
        )
    }
}
