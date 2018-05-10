import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateMenuViewable } from './reducer-handlers';
import Logout from './logout'

let DropDownMenuDumb = ({ menuViewable, updateMenuViewable, userObject }) =>
    <div className={isViewable(menuViewable)}>
        <div className="menu">
            <div className="profile-container">
                <div className="menu-picture">
                    <img className="thumbnail" alt="Hamburger Menu" src={'http://localhost:5000/' + userObject.thumbnail} />
                </div>
                <h4>{userObject.username}</h4>
            </div>
            <ul className="menu-nav" onClick={() => updateMenuViewable()}>
                <li>
                    <Link className="nav" to="/profile">Profile</Link>
                </li>
                <li>
                    <Link className="nav" to="/walks">Find Walks</Link>
                </li>
                <li>
                    <Link className="nav" to="/favorites">Favorite Walks</Link>
                </li>
                <li>
                    <Link className="nav" to="/offline">Offline Walks</Link>
                </li>
                <li>
                    <Link className="nav" to="/contributions">Your Contributed Walks</Link>
                </li>
                <li>
                    <Link className="nav" to="/addwalk">Contribute a Walk</Link>
                </li>
                <Logout />
            </ul>
        </div>
    </div>

let isViewable = (boolean) => {
    if (boolean) {
        return 'drop-down';
    } else {
        return 'unviewable';
    }
}

let mapStateToProps = (state) =>
    ({
        menuViewable: state.menuViewable,
        userObject: state.userObject,
    })

let mapDispatchToProps = (dispatch) =>
    ({ 
        updateMenuViewable: () => dispatch(updateMenuViewable())
    })

let DropDownMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(DropDownMenuDumb);

export default DropDownMenu;