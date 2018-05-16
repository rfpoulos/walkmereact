import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
        postProfilePicture,
        postUserAboutMe,
        postUserLocation,
     } from './fetch-data';
import { updateUserObject, updateProfileBeingViewed } from './reducer-handlers';
import { server } from './variables'

let EditProfileDumb = ({ userObject, updateUserObject, updateProfileBeingViewed }) =>
    <div className="profile">
        <div className="profile-photo">
            <img className="thumbnail" src={server + '/' + userObject.thumbnail} alt="User Thumbnail" />
        </div>
        <form className="profile" onSubmit={
                        (event) => 
                        postProfilePictureEvent(event, userObject, updateUserObject)
                        }>
            <input type="file" name="thumbnail"
                accept=".png, .jpg, .jpeg .gif" encType="multipart/form-data" />
            <button type="submit">Update Profile Picture</button>
        </form>
        <h2>{userObject.location}</h2>
        <form className="profile" onSubmit={
            (event) =>
            submitLocation(event, updateUserObject)
            }>
            <input type="text" name="location" placeholder={userObject.location} />
            <button type="submit">Update Home Town</button>
        </form>
        <p>{userObject.aboutme}</p>
        <form className="profile" onSubmit={
            (event) =>
            submitAboutMe(event, updateUserObject)
            }>
            <textarea name="about-me" placeholder={userObject.aboutme} />
            <button type="submit">Update About Me</button>
        </form>
        <Link to="/profile"
            onClick={() => updateProfileBeingViewed(userObject)}
        >Back to Profile</Link>
    </div>

let postProfilePictureEvent = (event, userObject, updateUserObject) => {
    event.preventDefault()
    postProfilePicture(event.target.thumbnail.files[0])
    .then(thumbnail => 
        updateUserObject({ ...userObject, thumbnail }) );
}

let submitLocation = async (event, updateUserObject) => {
    event.preventDefault();
    let location = event.target.location.value;
    let newUserObject = await postUserLocation({location});
    updateUserObject(newUserObject);
}

let submitAboutMe = async (event, updateUserObject) => {
    event.preventDefault();
    let aboutMe = event.target['about-me'].value;
    let newUserObject = await postUserAboutMe({aboutMe});
    updateUserObject(newUserObject);
}

let mapStateToProps = (state) => {
    return {
        userObject: state.userObject
     };
}

let mapDispatchToProps = (dispatch) =>
    ({
        updateUserObject: (res) => dispatch(updateUserObject(res)),
        updateProfileBeingViewed: (object) => dispatch(updateProfileBeingViewed(object)),
    })

let EditProfile = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProfileDumb);

export default EditProfile;