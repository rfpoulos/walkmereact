import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
        fetchCreateAccount, 
        fetchSignIn,
        } from './fetch-data';
import { updateUserObject } from './reducer-handlers';

let CreateAccountDumb = ({ updateUserObject, history }) =>
    <div className="create-account-container">
        <form className="create-account" onSubmit={(event) => createNewAccount(event, history, updateUserObject)}>
            <input type="email" placeholder="email" name="email" />
            <input type="text" placeholder="username" name="username" />
            <input type="password" placeholder="password" name="password" />
            <button type="submit">Create Account</button>
            <Link to="/">Already have an account?  Go to sign-in.</Link>
        </form>
    </div>

let createNewAccount = (event, history, updateUserObject) => {
    event.preventDefault();
    let createFetchBody = {
        email: event.target.email.value,
        username: event.target.username.value,
        password: event.target.password.value
    }
    fetchCreateAccount(createFetchBody)
    .then( success => {
        if (success) {
            let signInFetchBody = {
                identifier: createFetchBody.email,
                password: createFetchBody.password
            }
            fetchSignIn(signInFetchBody)
            .then( data => {
                updateUserObject(data);
                history.push('/walks');
            })
        }
    })
}

let mapStateToProps = (state) => {
    return { };
}

let mapDispatchToProps = (dispatch, { history }) =>
    ({
        updateUserObject: (res) => dispatch(updateUserObject(res)),
        history
    })

let CreateAccount = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateAccountDumb);

export default CreateAccount;