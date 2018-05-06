import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

let CreateAccountDumb = () =>
    <div>
        <div>
            <input type="text" placeholder="email" name="email" />
            <input type="text" placeholder="username" name="username" />
            <input type="password" placeholder="password" name="password" />
        </div>
        <div>
            <h4>Upload Photo</h4>
            <input type="file" name="profile_thumbnail"
                accept="image/x-png,image/gif,image/jpeg" />
        </div>
        <button>Create Account</button>
        <Link to="/">Already have an account?  Go to sign-in.</Link>
    </div>

export default CreateAccountDumb;