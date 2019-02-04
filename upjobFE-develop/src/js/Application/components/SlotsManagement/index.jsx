import React from 'react'
import Slider from "react-slick";
import {CardVacancyOrEmployeeSmall} from "../CardVacancyOrEmployeeSmall"
import Global from "../../global.js";
import ApiRequest from '../../../ApiRequest';
import './style.css';

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{style, display: "block", background: "blue" }}
      onClick={onClick}
    />
  );
}

export class SlotsManagement extends React.Component {
    constructor(props) {
        super(props)
        this.changeActivationStatus = this.changeActivationStatus.bind(this)
        this.state = {
            vacancies: [],
            employees: [],
            availableSlots: 0,
        }
    }

    changeActivationStatus = (response, cardType, flag) => {
        cardType == 'vacancy' ? (
        ApiRequest.get(Global.HOST + Global.PORT + "vacancies")
            .then((response) => {
                this.setState({vacancies: response})
            })
            .catch(error => console.log(error))
        ) : (
        ApiRequest.get(Global.HOST + Global.PORT + "employees")
            .then((response) => {
                this.setState({employees: response})
            })
            .catch(error => console.log(error))
        )
        flag === "True" ? this.setState({availableSlots: parseInt(this.state.availableSlots) - 1}) : this.setState({availableSlots: parseInt(this.state.availableSlots) + 1})
    }

    componentDidMount = () => {
        ApiRequest.get(Global.HOST + Global.PORT + "vacancies")
            .then((response) => {
                this.setState({vacancies: response})
            })
            .catch(error => console.log(error));
        ApiRequest.get(Global.HOST + Global.PORT + "employees")
            .then((response) => {
                this.setState({employees: response})
            })
            .catch(error => console.log(error));
        ApiRequest.get(Global.HOST + Global.PORT + "quantity" + '/' + JSON.parse(localStorage.getItem('company_id')))
            .then((response) => {
                this.setState({availableSlots: response.quantity})
            })
            .catch(error => console.log(error));
    }

    render() {
        let vacancies_list = this.state.vacancies.map((entity) => {
            return <CardVacancyOrEmployeeSmall entity={entity} key={entity.id}
            changeActivationStatus={this.changeActivationStatus}/>
        });
        let employees_list = this.state.employees.map((entity) => {
            return <CardVacancyOrEmployeeSmall entity={entity} key={entity.id} changeActivationStatus={this.changeActivationStatus}/>
        });
        var settings = {
          rows: 1,
          dots: true,
          infinite: false,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          nextArrow: <SamplePrevArrow />,
          prevArrow: <SamplePrevArrow/>,
        };
        return (
          <div className={"SlotManagerContainer"}>
              <div>
                  <h2 style={{textAlign: "right", fontSize: "18px"}}>Available slots:
                      <div style={{padding: '5px 10px', display: 'inline-block', margin: '5px', background: '#cacaca'}}>{this.state.availableSlots}</div>
                  </h2>
              </div>
              <div>
                  <h3>Vacancies</h3>
                  <Slider {...settings}>
                      {vacancies_list}
                  </Slider>
              </div>
              <div>
                  <h3 style={{marginTop: 80 + "px"}}>Employees</h3>
                  <Slider {...settings}>
                      {employees_list}
                  </Slider>
              </div>
          </div>

    );
  }
}
