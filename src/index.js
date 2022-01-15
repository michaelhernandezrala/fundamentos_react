import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {getToken} from './utils/storage';
import { setAuthorizationHeader } from './services/Client';

const accessToken = getToken();
setAuthorizationHeader(accessToken);

ReactDOM.render(
  <React.StrictMode>
    <App isInitiallyLogged={!!accessToken}/>
  </React.StrictMode>,
  document.getElementById('root')
);

