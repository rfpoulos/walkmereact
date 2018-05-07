import React from 'react';
import './App.css';
import { 
          HashRouter as Router, 
          Route, 
          Link, 
          Switch
        } from 'react-router-dom';
import SignIn from './sign-in';
import CreateAccount from './create-account';
import Header from './header';
import Walks from './walks';
import DropDownMenu from './drop-down-menu';

let App = () =>
  <Router>
    <div>
        <Header />
        <DropDownMenu />
        <Switch>
          <Route path="/walks" component={ Walks } />
          <Route path="/create-account" component={ CreateAccount } />
          <Route path="/" component={ SignIn } />
        </Switch>
    </div>
  </Router>
;

export default App;