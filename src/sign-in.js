import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
        fetchSignIn, 
        fetchUserObject, 
     } from './fetch-data';
import { updateInitialState } from './reducer-handlers';

let SignInDumb = ({ history, updateInitialState}) =>
    <div className="create-account-container">
        {
            checkLocalStorage(history, updateInitialState)
        }
        <form className="create-account" onSubmit={(event) => signIn(event, history, updateInitialState)}>
            <input type="text" placeholder="Username or Email" name="identifier" />
            <input type="password" placeholder="password" name="password" />
            <button type="submit">Sign In</button>
            <Link to="/create-account"> New user?  Create Account.</Link>
        </form>
    </div>

let signIn = async (event, history, updateInitialState) => {
    event.preventDefault();
    let signInFetchBody = {
        identifier: event.target.identifier.value,
        password: event.target.password.value
    }
    let userObject = await fetchSignIn(signInFetchBody)
        updateInitialState(userObject);
        history.push('/walks');
}

let checkLocalStorage = (history, updateInitialState) => {
    let localToken = localStorage.getItem("token");
    if (localToken) {
        getInitialState(history, updateInitialState);
    }
}

let getInitialState = async (history, updateInitialState) => {
    let result = await fetchUserObject();
    updateInitialState(result);
    history.push('/walks');
}

let mapStateToProps = (state, { history }) =>
    ({ 
        history
    })

let mapDispatchToProps = (dispatch) =>
    ({
        updateInitialState: (res) => dispatch(updateInitialState(res))
    })

let SignIn = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInDumb);

export default SignIn;