import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {Header} from "../Header";
import { Home } from '../Home/index';
import {SignIn} from '../SignIn/index';
import {SignUp} from '../SignUp/index';
import {VacanciesListCards, EmployeesListCards} from '../ListCards/index';
import {Profile} from '../Profile/index';

export const Main = () => (
    <div>
        <Header/>
        <div style={{marginTop: '100px'}}>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/signin' component={SignIn}/>
                <Route path='/signup' component={SignUp}/>
                <Route path='/vacancies' component={VacanciesListCards}/>
            <Route path='/employees' component={EmployeesListCards}/>
                <Route path='/profile' component={Profile}/>
            </Switch>
        </div>
    </div>
);
