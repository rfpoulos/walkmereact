import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
        fetchCreateAccount, 
        fetchSignIn,
        } from './fetch-data';
import { updateInitialState } from './reducer-handlers';

let CreateAccountDumb = ({ updateInitialState, history }) =>
    <div className="create-account-container">
        <form className="create-account" onSubmit={(event) => createNewAccount(event, history, updateInitialState)}>
            <input type="email" placeholder="email" name="email" />
            <input type="text" placeholder="username" name="username" />
            <input type="password" placeholder="password" name="password" />
            <button type="submit">Create Account</button>
            <Link to="/">Already have an account?  Go to sign-in.</Link>
        </form>
    </div>

let createNewAccount = (event, history, updateInitialState) => {
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
                updateInitialState(data);
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
        updateInitialState: (res) => dispatch(updateInitialState(res)),
        history
    })

let CreateAccount = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateAccountDumb);

export default CreateAccount;