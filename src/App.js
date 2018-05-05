import React from 'react';
import './App.css';
import { 
          HashRouter as Router, 
          Route, 
          Link, 
          Switch
        } from 'react-router-dom';
import SignIn from './sign-in';
let App = () =>
  <Router>
        <Switch>
          <Route path="/" component={SignIn} />
        </Switch>
  </Router>
;

export default App;