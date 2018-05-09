import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
        postInitialWalk,
        postWalkThumbnail,
        postWalkAudio,
        postWalkVideo,
    } from './fetch-data'

let AddWalkFormDumb = ({  }) =>
    <form onSubmit={(event) => submitWalk(event)}>
        <input type="text" name="title" placeholder="Title (required)" />
        <input type="text" name="description" placeholder="description" />
        <h5>Thumbnail</h5>
        <input type="file" name="walkthumbnail"
                accept=".png, .jpg, .jpeg .gif" 
                encType="multipart/form-data" />
        <h5>Audio</h5>
        <input type="file" name="walk-audio"
                accept=".mp3" 
                encType="multipart/form-data" />
        <h5>Video</h5>
        <input type="file" name="walk-video"
                accept=".WMV, .AVI, .MOV, MPEG and .MP4" 
                encType="multipart/form-data" />
        <button type="submit">Start a Walk!</button>
    </form>

let submitWalk = async (event) => {
    let initialWalkObject = {
        title: event.target.title.value,
        description: event.target.title.value
    }
    let thumbnail = event.target.walkthumbnail.files[0];
    let walk = await postInitialWalk(initialWalkObject);
    let results = await Promise.all([
        postWalkThumbnail(walk[0].id, thumbnail),
        // postWalkAudio(walk.id, event.target['walk-audio'].files[0]),
        // postWalkVideo(walk.id, event.target['walk-video'].files[0])
    ]);
    console.log(results);
}

let mapStateToProps = (state) =>
    ({
    })

let mapDispatchToProps = (dispatch) =>
    ({ 
        // updateWalkBeingEdited: () => dispatch(updateWalkBeingEdited())
    })

let AddWalkForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddWalkFormDumb);

export default AddWalkForm;