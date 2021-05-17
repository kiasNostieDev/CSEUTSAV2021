import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Regis from './Pages/Regis';
import Console from './Pages/Console';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Tabler from './Pages/Tabler';


ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/register/:slug' component={Regis} />
        <Route path='/console' component={Console}/>
        <Route path='/table/:slug' component={Tabler}/>
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
