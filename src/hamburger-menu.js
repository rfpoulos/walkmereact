import React from 'react';
import { connect } from 'react-redux';
import { updateMenuViewable } from './reducer-handlers';
import Hamburger from './images/bars.svg'

let HamburgerMenuDumb = ({ userObject, updateMenuViewable }) => 
    <li>
    {
        shouldRender(userObject, updateMenuViewable)
    }
    </li>

let shouldRender = (userObject, updateMenuViewable) => { 
    if (userObject) {
        return <img className="hamburger" src={Hamburger} alt="Menu" onClick={ () => updateMenuViewable() } />
    }
}

let mapStateToProps = (state) =>
    ({
        userObject: state.userObject,
    })

let mapDispatchToProps = (dispatch) =>
    ({ 
        updateMenuViewable: () => dispatch(updateMenuViewable())
    })

let HamburgerMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(HamburgerMenuDumb);

export default HamburgerMenu;