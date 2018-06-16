import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { server } from './variables';
import { updateUserObject } from './reducer-handlers';
import { compose, lifecycle } from 'recompose';

let ProfileDumb = ({ userObject, profileBeingViewed }) =>
    <div className="profile">
        <div className="profile-photo">
            <img className="thumbnail" src={server + '/' + profileBeingViewed.thumbnail} alt="User Thumbnail" />
        </div>
        <h2><strong>{profileBeingViewed.username}</strong></h2>
        <h2>Home Town: {profileBeingViewed.location}</h2>
        <h2>About Me</h2>
        <p>{profileBeingViewed.aboutme}</p>
        {
            ableToEdit(userObject.id, profileBeingViewed.id)
        }
    </div>

let ableToEdit = (userId, profileId) => {
    if (userId === profileId) {
        return <Link to="/editprofile">Edit Your Profile</Link>
    }
}

let mapStateToProps = (state) => {
    return {
        userObject: state.userObject,
        profileBeingViewed: state.profileBeingViewed
     };
}

let mapDispatchToProps = (dispatch) =>
    ({
        updateUserObject: (res) => dispatch(updateUserObject(res))
    })

let Profile = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileDumb);

export default Profile;