import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';

ReactDOM.render(
  <Router children={Routes}>
	</Router>,
  document.getElementById('root')
);
