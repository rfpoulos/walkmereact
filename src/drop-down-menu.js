import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateMenuViewable } from './reducer-handlers';

let DropDownMenuDumb = ({ menuViewable, updateMenuViewable }) =>
    <div className={isViewable(menuViewable)}>
        <ul onClick={() => updateMenuViewable()}>
            <li>
                <Link to="/profile">Profile</Link>
            </li>
            <li>
                <Link to="/walks">Find Walks</Link>
            </li>
            <li>
                <Link to="/favorites">Favorite Walks</Link>
            </li>
            <li>
                <Link to="/offline">Offline Walks</Link>
            </li>
            <li>
                <Link to="/contributions">Your Contributed Walks</Link>
            </li>
            <li>
                <Link to="/addawalk">Contribute a Walk</Link>
            </li>
        </ul>
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
        menuViewable: state.menuViewable
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