import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { revertInitialState, updateMenuViewable } from './reducer-handlers';

let LogoutDumb = ({ userObject, revertInitialState, history, updateMenuViewable }) => 
    <li onClick={() => updateMenuViewable()}>
        {
            shouldRender(userObject, revertInitialState, history)
        }
    </li>

let shouldRender = (userObject, revertInitialState, history) => { 
    if (userObject) {
        return <span className="nav" onClick={() =>
            logoutFunction(revertInitialState, history)
        }
        >Logout</span>
    }
}

let logoutFunction = (revertInitialState, history) => {
    localStorage.removeItem('token');
    revertInitialState();
    history.push('/');
}

let mapStateToProps = (state, { history }) =>
    ({
        userObject: state.userObject,
        history
    })

let mapDispatchToProps = (dispatch) =>
    ({ 
        revertInitialState: () => dispatch(revertInitialState()),
        updateMenuViewable: () => dispatch(updateMenuViewable()),
    })

let Logout = connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutDumb);

export default withRouter(Logout);