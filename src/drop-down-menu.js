import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
            updateMenuViewable, 
            updateProfileBeingViewed, 
            updateEditableWalks,
         } from './reducer-handlers';
import Logout from './logout'
import { server } from './variables';
import { getContributedWalks } from './fetch-data';

let DropDownMenuDumb = ({ 
                            menuViewable, 
                            updateMenuViewable, 
                            userObject, 
                            updateProfileBeingViewed,
                            updateEditableWalks,
                        }) =>
    <div className={isViewable(menuViewable)}>
        <div className="menu">
            <div className="profile-container">
                <div className="menu-picture">
                    <img className="thumbnail" alt="Hamburger Menu" src={server + '/' + userObject.thumbnail} />
                </div>
                <h4 className="low-margin">{userObject.username}</h4>
            </div>
            <ul className="menu-nav" onClick={() => updateMenuViewable()}>
                <li>
                    <Link className="nav" to="/profile/" 
                        onClick={() => updateProfileBeingViewed(userObject)}
                    >Profile</Link>
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
                    <Link className="nav" to="/yourwalks"
                        onClick={() => getContributedWalks()
                            .then(data =>  updateEditableWalks(data))}
                    >Your Contributed Walks
                    </Link>
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
        updateMenuViewable: () => dispatch(updateMenuViewable()),
        updateProfileBeingViewed: (profile) => dispatch(updateProfileBeingViewed(profile)),
        updateEditableWalks: (data) => dispatch(updateEditableWalks(data)),
    })

let DropDownMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(DropDownMenuDumb);

export default DropDownMenu;