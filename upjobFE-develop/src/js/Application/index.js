import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter } from 'react-router-dom';

import { Main } from './components/Main/index';

const App = () => (
    <div>
        <Main/>
    </div>
);


ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('app')
);