import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

let SignInDumb = () =>
    <div>
        <input type="text" placeholder="username" name="username" />
        <input type="password" placeholder="password" name="password" />
        <button>Sign In</button>
        <button>Create Account</button>
    </div>

export default SignInDumb;