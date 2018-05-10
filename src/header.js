import React from 'react';
import HamburgerMenu from './hamburger-menu';
import appTitle from './images/walkme-nav.png'

let HeaderDumb = () =>
    <ul className="header">
        <HamburgerMenu />
        <li>
            <img className="header-logo" alt="logo" src={appTitle} />
        </li>
        <li>
        </li>
    </ul>

export default HeaderDumb;