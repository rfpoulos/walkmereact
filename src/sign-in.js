import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

let SignInDumb = () =>
    <div>
        <div>
            <input type="text" placeholder="Username or Email" name="identifier" />
            <input type="password" placeholder="password" name="password" />
        </div>
        <button>Sign In</button>
        <Link to="/create-account"> New user?  Create Account.</Link>
    </div>

export default SignInDumb;