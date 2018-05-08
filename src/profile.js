import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postProfilePicture } from './fetch-data';
import { updateInitialState } from './reducer-handlers';

let ProfileDumb = ({ userObject, updateInitialState }) =>
    <div>
        <img src={'http://localhost:5000/' + userObject.thumbnail} />
        <form onSubmit={
                        (event) => 
                        postProfilePictureEvent(event,
                             localStorage.getItem('token'), userObject, updateInitialState)
                        }>
            <input type="file" name="thumbnail"
                accept=".png, .jpg, .jpeg .gif" encType="multipart/form-data" />
            <button type="submit">Update Profile Picture</button>
        </form>
    </div>

let postProfilePictureEvent = (event, token, userObject, updateInitialState) => {
    event.preventDefault()
    postProfilePicture(event.target.thumbnail.files[0], token).then(thumbnail => 
        updateInitialState({ ...userObject, thumbnail }) );
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