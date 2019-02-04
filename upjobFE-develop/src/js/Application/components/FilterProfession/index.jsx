import React, {Component} from 'react'

export default class FilterProfession extends Component {
    constructor(props){
        super(props)
        this.onChange=this.onChange.bind(this)
    }

    onChange = (e) => {
        this.props.onProfessionChange([e.target.checked, e.target.id])
    }

    render(){
        return(
            <div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" checked={this.props.addedProfessions.includes(this.props.profession.value)} class="custom-control-input" id={this.props.profession.value} onChange={this.onChange}/>
                  <label class="custom-control-label" for={this.props.profession.value}>{this.props.profession.name}</label>
                </div>
            </div>
        )
    }
}
