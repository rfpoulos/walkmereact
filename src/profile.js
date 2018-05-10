import React from 'react';
import { connect } from 'react-redux';
import { postProfilePicture } from './fetch-data';
import { updateInitialState } from './reducer-handlers';

let ProfileDumb = ({ userObject, updateInitialState }) =>
    <div className="profile">
        <div className="profile-photo">
            <img className="thumbnail" src={'http://localhost:5000/' + userObject.thumbnail} alt="User Thumbnail" />
        </div>
        <form className="profile" onSubmit={
                        (event) => 
                        postProfilePictureEvent(event, userObject, updateInitialState)
                        }>
            <input type="file" name="thumbnail"
                accept=".png, .jpg, .jpeg .gif" encType="multipart/form-data" />
            <button type="submit">Update Profile Picture</button>
        </form>
        <form className="profile" onSubmit={
            (event) =>
            postLocation(event, userObject, updateInitialState)
            }>
            <input type="text" name="location" placeholder={userObject.location} />
            <button type="submit">Update Home Town</button>
        </form>
        <form className="profile" onSubmit={
            (event) =>
            postAboutMe(event, userObject, updateInitialState)
            }>
            <textarea name="about-me" placeholder={userObject.aboutme} />
            <button type="submit">Update About Me</button>
        </form>
    </div>

let postProfilePictureEvent = (event, userObject, updateInitialState) => {
    event.preventDefault()
    postProfilePicture(event.target.thumbnail.files[0]).then(thumbnail => 
        updateInitialState({ ...userObject, thumbnail }) );
}

let postLocation = (event, userObject, updateInitialState) => {
    event.preventDefault();
}

let postAboutMe = (event, userObject, updateInitialState) => {
    event.preventDefault();
}

let mapStateToProps = (state) => {
    return {
        userObject: state.userObject
     };
}

let mapDispatchToProps = (dispatch) =>
    ({
        updateInitialState: (res) => dispatch(updateInitialState(res))
    })

let Profile = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileDumb);

export default Profile;