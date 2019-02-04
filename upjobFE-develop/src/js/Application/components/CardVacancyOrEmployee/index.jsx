import React, {Component} from 'react';
import {Button, Modal} from 'antd';
import './style.css';
import RequirementOrCompetency from '../RequirementOrCompetency';

export class CardVacancyOrEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }

    setModalVisible = (modalVisible) => {
        this.setState({modalVisible})
    }

    render() {
        let entity = this.props.entity;
        let stack_list = []
        if (entity.requirements) {
            stack_list = entity.requirements.map((stack) =>
            {return <RequirementOrCompetency stack={stack} key={stack.name} />})
        } else {
            stack_list = entity.competences.map((stack) =>
            {return <RequirementOrCompetency stack={stack} key={stack.name} />})
        }

        return (
            <div className="CardVacancyOrEmployee card card_slot ant-col-5">
                <div className="card_header">
                    <CompanyAvatar/>
                    <h4>{entity.title}</h4>
                </div>
                <hr/>
                <div className="block_personal_inform">
                    <div className="entry-list">
                        <div className="entry">
                            <b className="entry key">Profession:</b>
                            <span
                                className="entry value">{entity.profession}</span>
                        </div>
                    </div>
                    <Button type="primary"
                            onClick={() => this.setModalVisible(true)}>Details &raquo;</Button>
                </div>
                <hr/>
                <div className="skills-badges-container">
                    {stack_list}
                </div>

                <Modal title={null}
                       visible={this.state.modalVisible}
                       onCancel={() => this.setModalVisible(false)}
                       wrapClassName="vertical-center-modal"
                       width={750}
                       footer={
                           <Button key="submit" type="primary"
                                   onClick={() => this.setModalVisible(false)}>Ok</Button>
                       }
                >
                    <div className="offer-modal-body">
                        <div className="offer-modal-body__title">
                            <h3>{entity.title}</h3>
                        </div>
                        <hr/>
                        <div className="offer-modal-body__summary-section">
                            <CompanyAvatar/>
                            <div className="summary">
                                <ul>
                                    <li><b>Company:</b> <span>{entity.company}</span></li>
                                    <li><b>Public ID:</b> <span>{entity.public_id}</span></li>
                                    <li><b>Profession:</b> <span>{entity.profession}</span></li>
                                </ul>
                            </div>
                        </div>
                        <hr/>
                        <div className="offer-modal-body__details">
                            <div className="offer-modal-container">
                                <h4>Skills:</h4>
                                <div className="skills-badges-container">
                                    {stack_list}
                                </div>
                            </div>
                            <hr/>
                            <div className="offer-modal-container">
                                <h4>Description:</h4>
                                <div className="description-container">
                                    <p>
                                        {entity.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal>

            </div>
        )
    }
}

function Badge(props) {
    return (
        <span className="Badge badge badge-secondary badge-technology">
            {props.children}
        </span>
    );
}


function CompanyAvatar(props) {
    const imgUrl = props.url || "https://placeimg.com/200/200/animals";
    const alt = props.alt;

    return (
        <div className="CompanyAvatar">
            <img src={imgUrl} alt={alt}/>
        </div>
    )
}

export default CardVacancyOrEmployee