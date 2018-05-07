import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { updateInitialState } from './reducer-handlers';

let LogoutDumb = ({ userObject, updateInitialState, history }) => 
    <li>
        {
            shouldRender(userObject, updateInitialState, history)
        }
    </li>

let shouldRender = (userObject, updateInitialState, history) => { 
    if (userObject) {
        return <h2 onClick={() =>
            logoutFunction(updateInitialState, history)
        }
        >Logout</h2>
    }
}

let logoutFunction = (updateInitialState, history) => {
    localStorage.removeItem('token');
    updateInitialState('');
    history.push('/');
}

let mapStateToProps = (state, { history }) =>
    ({
        userObject: state.userObject,
        history
    })

let mapDispatchToProps = (dispatch) =>
    ({ 
        updateInitialState: (res) => dispatch(updateInitialState(res)),
    })

let Logout = connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutDumb);

export default withRouter(Logout);