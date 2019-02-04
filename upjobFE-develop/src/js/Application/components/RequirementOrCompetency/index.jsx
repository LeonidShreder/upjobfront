import React, {Component} from 'react'
import '../CardVacancyOrEmployee/'
import '../CardVacancyOrEmployee/style.css';


export default class RequirementOrCompetency extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className='Badge badge badge-secondary badge-technology'>
                {this.props.stack.name}: {this.props.stack.experience}
                {this.props.stack.experience==='less than 1 year' ? '' : ' years'}
            </div>
        )
    }
}

