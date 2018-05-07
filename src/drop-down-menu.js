import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

let DropDownMenuDumb = ({ menuViewable }) =>
    <div className={isViewable(menuViewable)}>
        <ul>
            <li>
                <Link to="/walks">Walks</Link>
            </li>
            <li>
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
    })

let DropDownMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(DropDownMenuDumb);

export default DropDownMenu;