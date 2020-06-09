import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
//import App from './components/app';
import App from './App';
//const element = <h1>hello World</h1>;
//ReactDom.render(<App />, document.getElementById('root'));
//ReactDom.render(<Movies />, document.getElementById('root'));
console.log('SUPERMAN', process.env.REACT_APP_NAME);
ReactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
//registerServiceWorker();
