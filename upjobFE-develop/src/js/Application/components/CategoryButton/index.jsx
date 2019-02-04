import React, {Component} from 'react';
import ApiRequest from '../../../ApiRequest';


export class CategoryButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            entities: [],
        }
    };

    componentDidMount = () => {
        ApiRequest.get('http://localhost:5000/professions')
            .then((response) => {
                this.setState({entities: response})
            })
            .catch(error => console.log(error));
    };

    onClick = (e) => {
        this.props.onChooseCategoryButton(e.target.value)
    };

    render() {
        let category_list = this.state.entities.map((entity) => {
            return <button className={"main_page_button"} onClick={this.onClick}
                           value={entity.value}>{entity.name}</button>
        });
        return (
            <div className="main_page">
                {category_list}
            </div>
        )
    }
}
