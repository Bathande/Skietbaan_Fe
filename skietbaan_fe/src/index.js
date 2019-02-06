

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import { Provider } from 'react-redux'
//import configureStore from './store';
import { Provider } from 'react-redux'
import configureStore from './store';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(<App />, document.getElementById('root'));
/** ReactDOM.render(<Provider store={configureStore()}>
<App />
</Provider>,
document.getElementById('root')
);  */
//registerServiceWorker();
serviceWorker.register();
