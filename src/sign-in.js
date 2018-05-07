import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCreateAccount, fetchSignIn } from './fetch-data';
import { updateInitialState } from './reducer-handlers';

let SignInDumb = ({ history, updateInitialState}) =>
    <div>
        <form onSubmit={(event) => signIn(event, history, updateInitialState)}>
            <input type="text" placeholder="Username or Email" name="identifier" />
            <input type="password" placeholder="password" name="password" />
            <button type="submit">Sign In</button>
        </form>
        <Link to="/create-account"> New user?  Create Account.</Link>
    </div>

let signIn = (event, history, updateInitialState) => {
    event.preventDefault();
    let signInFetchBody = {
        identifier: event.target.identifier.value,
        password: event.target.password.value
    }
    fetchSignIn(signInFetchBody)
    .then( data => {
        updateInitialState(data);
        history.push('/walks');
    })
}

let mapStateToProps = (state) =>
    ({ })

let mapDispatchToProps = (dispatch, { history }) =>
    ({
        updateInitialState: (res) => dispatch(updateInitialState(res)),
        history
    })

let SignIn = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInDumb);

export default SignIn;