import React from 'react';

import { ChooseVacancyOrEmployee } from '../ChoseVacancyOrEmployee/index';
import { CategoryButton } from '../CategoryButton';

export class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            vacancyOrEmployee: 'vacancy',
        }
    }

    onVacancyOrEmployeeChange = (value) => {
        this.setState({
            vacancyOrEmployee: value,
        });
    }

    onChooseCategoryButton = (value) => {
        if (this.state.vacancyOrEmployee === 'vacancy'){
            window.location = '/vacancies?value=' + value;
        } else {
            window.location = '/employees?value=' + value;
        }
    }

    render() {
        return (
            <div>
                <ChooseVacancyOrEmployee onVacancyOrEmployeeChange={this.onVacancyOrEmployeeChange}/>
                <CategoryButton onChooseCategoryButton={this.onChooseCategoryButton}/>
            </div>
        )
    }
}
