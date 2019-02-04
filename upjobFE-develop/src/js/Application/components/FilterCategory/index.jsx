import React, {Component} from 'react';
import FilterTechnology from '../FilterTechnology'
import Accordion from 'react-collapsy';
require('../../../../../node_modules/react-collapsy/lib/index.css');

export class FilterCategory extends Component {
    constructor(props){
        super(props)
    }
    render() {
        let technology_list = this.props.category.technology.map(
            (technology)=>{return <FilterTechnology technology={technology} key={technology.id} onTechnologyChange={this.props.onTechnologyChange}/>})
        return (
            <div>
                <Accordion title={this.props.category.category}>
                    <div>
                        {technology_list}
                    </div>
                </Accordion>
            </div>
        )
    }
}

export default FilterCategory
