import { Radio } from 'antd';
import React from "react";

export class ChooseVacancyOrEmployee extends React.Component {
    onChangeVacancyOrEmployee = (e) => {
        this.props.onVacancyOrEmployeeChange(e.target.value);
    }
    render() {
        return (
            <div style={{textAlign: 'center', paddingTop: '2em'}}>
                <Radio.Group defaultValue="vacancy" onChange={this.onChangeVacancyOrEmployee}>
                    <Radio.Button value="vacancy">Find vacancy</Radio.Button>
                    <Radio.Button value="employee">Find employee</Radio.Button>
                </Radio.Group>
            </div>
        )
    }
}
