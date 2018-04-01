import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import data from './resources/data.json';
import '@warehouses/warehouses-ui/css/styles.css'
import './resources/css/styles.css';

ReactDOM.render(
  <App data={data}/>,
  document.getElementById('root')
);
