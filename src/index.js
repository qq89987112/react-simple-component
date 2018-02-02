import "babel-polyfill"
import React from 'react';
import ReactDOM from 'react-dom';
import "./assets"
import "./js"
import Router from './views';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
