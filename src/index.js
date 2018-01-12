import React from 'react';
import ReactDOM from 'react-dom';
import "./assets"
import Router from './views';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
