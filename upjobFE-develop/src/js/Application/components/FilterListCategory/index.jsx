import React, {Component} from 'react'
import ApiRequest from '../../../ApiRequest';
import FilterCategory from '../FilterCategory';
import './style.css';


export class FilterListCategory extends Component {
    constructor(props){
        super(props)
        this.state ={
            filters: []
        }
    }

    componentDidMount(){
        ApiRequest.get('http://localhost:5000/technologies_by_category').then(
            (response) => {return this.setState({filters: response})})
            .catch(error => console.log(error));
    }

    render(){
        let categories = this.state.filters.map((category)=>{
            return <FilterCategory category={category} key={category.category} onTechnologyChange={this.props.onTechnologyChange}/>
        })
        return(
            <div>
                <div>
                  {categories}
                </div>
            </div>
        )
    }
}

export default FilterListCategory
