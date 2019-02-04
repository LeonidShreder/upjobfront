import React, {Component} from 'react';

export class FilterTechnology extends Component {
    constructor(props){
        super(props)
        this.onChange=this.onChange.bind(this)
    }

    onChange = (e) => {
        this.props.onTechnologyChange([e.target.checked, e.target.id])
    }

    render() {
        return (
            <div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id={this.props.technology.id} onChange={this.onChange}/>
                  <label class="custom-control-label" for={this.props.technology.id}>{this.props.technology.name}</label>
                </div>
            </div>
        )
    }
}

export default FilterTechnology
