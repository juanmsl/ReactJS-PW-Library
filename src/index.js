import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import data from './resources/data.json';
import './resources/css/styles.css';
import '@warehouses/warehouses-ui/css/styles.css'

ReactDOM.render(
  <App data={data}/>,
  document.getElementById('root')
);
