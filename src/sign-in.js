import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
        fetchSignIn, 
        fetchUserObject, 
     } from './fetch-data';
import { updateUserObject } from './reducer-handlers';

let SignInDumb = ({ history, updateUserObject}) =>
    <div className="create-account-container">
        {
            checkLocalStorage(history, updateUserObject)
        }
        <form className="create-account" onSubmit={(event) => signIn(event, history, updateUserObject)}>
            <input type="text" placeholder="Username or Email" name="identifier" />
            <input type="password" placeholder="password" name="password" />
            <button type="submit">Sign In</button>
            <Link to="/create-account"> New user?  Create Account.</Link>
        </form>
    </div>

let signIn = async (event, history, updateUserObject) => {
    event.preventDefault();
    let signInFetchBody = {
        identifier: event.target.identifier.value,
        password: event.target.password.value
    }
    let userObject = await fetchSignIn(signInFetchBody)
        updateUserObject(userObject);
        history.push('/walks');
}

let checkLocalStorage = (history, updateUserObject) => {
    let localToken = localStorage.getItem("token");
    if (localToken) {
        getUserupdateUserObject(history, updateUserObject);
    }
}

let getUserupdateUserObject = async (history, updateUserObject) => {
    let result = await fetchUserObject();
    updateUserObject(result);
    history.push('/walks');
}

let mapStateToProps = (state, { history }) =>
    ({ 
        history
    })

let mapDispatchToProps = (dispatch) =>
    ({
        updateUserObject: (res) => dispatch(updateUserObject(res))
    })

let SignIn = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInDumb);

export default SignIn;