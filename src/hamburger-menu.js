import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateMenuViewable } from './reducer-handlers';

let HamburgerMenuDumb = ({ userObject, updateMenuViewable }) => 
    <li>
    {
        shouldRender(userObject, updateMenuViewable)
    }
    </li>

let shouldRender = (userObject, updateMenuViewable) => { 
    if (userObject) {
        return <h2 onClick={ () =>
                             updateMenuViewable()
        }>Menu</h2>
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