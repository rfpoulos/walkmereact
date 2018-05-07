import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCreateAccount, fetchSignIn } from './fetch-data';
import { updateInitialState } from './reducer-handlers';

let CreateAccountDumb = ({ updateInitialState, history }) =>
    <div>
        <form onSubmit={(event) => createNewAccount(event, history, updateInitialState)}>
            <input type="text" placeholder="email" name="email" />
            <input type="text" placeholder="username" name="username" />
            <input type="password" placeholder="password" name="password" />
            <h4>Upload Photo</h4>
            <input type="file" name="thumbnail"
                accept=".png, .jpg, .jpeg" />
            <input type="text" name="aboutme" />
            <button type="submit">Create Account</button>
        </form>
        <Link to="/">Already have an account?  Go to sign-in.</Link>
    </div>

let createNewAccount = (event, history, updateInitialState) => {
    event.preventDefault();
    let createFetchBody = {
        email: event.target.email.value,
        username: event.target.username.value,
        password: event.target.password.value,
        thumbnail:  event.target.thumbnail.value,
        aboutme: event.target.aboutme.value
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