import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css'

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
