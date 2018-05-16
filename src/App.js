import React from 'react';
import './App.css';
import { 
          HashRouter as Router, 
          Route, 
          Switch
        } from 'react-router-dom';
import SignIn from './sign-in';
import CreateAccount from './create-account';
import Header from './header';
import Walks from './walks';
import DropDownMenu from './drop-down-menu';
import Profile from './profile';
import EditProfile from './edit-profile';
import AddWalk from './add-walk';
import EditWalk from './edit-walk';
import AddPoiForm from './add-poi-form';
import EditPoi from './edit-poi';
import YourWalks from './your-walks';
import Location from './location';

let App = () =>
  <Router>
    <div>
        <Location />
        <Header />
        <DropDownMenu />
        <Switch>
          <Route path="/yourwalks" component= { YourWalks } />
          <Route path="/editpoi/:id" component={ EditPoi } />
          <Route path="/addpois" component={ AddPoiForm } />
          <Route path="/editwalk/:id" component={ EditWalk } />
          <Route path="/addwalk" component={ AddWalk } />
          <Route path="/profile" component ={ Profile } />
          <Route path="/editprofile" component={ EditProfile } />
          <Route path="/walks" component={ Walks } />
          <Route path="/create-account" component={ CreateAccount } />
          <Route path="/" component={ SignIn } />
        </Switch>
    </div>
  </Router>
;

export default App;