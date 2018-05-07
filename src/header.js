import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HamburgerMenu from './hamburger-menu';
import Logout from './logout';

let HeaderDumb = () =>
    <ul className="header">
        <HamburgerMenu />
        <li><h2>Header!</h2></li>
        <Logout />
    </ul>

export default HeaderDumb;