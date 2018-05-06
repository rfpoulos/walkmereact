import React from 'react';
import './App.css';
import { 
          HashRouter as Router, 
          Route, 
          Link, 
          Switch
        } from 'react-router-dom';
import SignIn from './sign-in';
import CreateAccount from './create-account'
let App = () =>
  <Router>
    <div>
        <Switch>
          <Route path="/create-account" component={ CreateAccount } />
          <Route path="/" component={ SignIn } />
        </Switch>
    </div>
  </Router>
;

export default App;