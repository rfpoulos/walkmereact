import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    postWalkThumbnail,
    postWalkVideo,
    postWalkAudio,
} from './fetch-data';
import {
    updateWalkBeingEdited,
} from './reducer-handlers';

let EditWalkDumb = ({ walkBeingEdited, updateWalkBeingEdited }) =>
    <div className="edit-walk">
        <h2 className="self-center"><strong>Step 2:</strong> Introduce Your Walk!</h2>
        <div className="walk-thumbnail-container" >
            <img className="thumbnail" alt="Walk Thumbnail"
                 src={'http://localhost:5000/' + walkBeingEdited.thumbnail} />
        </div>
        <h4>Add/Change Walk Thumbnail</h4>
            <form className="edit-walk" onSubmit ={(event) => submitWalkThumbnail(event, walkBeingEdited, updateWalkBeingEdited)}>
                <input type="file" name="walk-thumbnail"
                        accept=".png, .jpg, .jpeg, .gif" 
                        encType="multipart/form-data" />
                <button type="submit">Submit</button>
            </form>
        <h4>Title</h4>
        <h2>{walkBeingEdited.title}</h2>
        <button>Edit</button>
        <h4>Description</h4>
        <p>{walkBeingEdited.description}</p>
        <button>Edit</button>
        {
            isThereVideo(walkBeingEdited)
        }
        <h4>Add/Change Video</h4>
            <form className="edit-walk" onSubmit={(event) => submitWalkVideo(event, walkBeingEdited, updateWalkBeingEdited)}>
                <input type="file" name="walk-video"
                    accept=".wmv, .avi, .mov, .mpeg, .mp4" 
                    encType="multipart/form-data" />
                <button type="submit">Submit</button>
            </form>
        {
            isThereAudio(walkBeingEdited)
        }
        <h4>Add/Change Audio</h4>
            <form className="edit-walk" onSubmit={(event) => submitWalkAudio(event, walkBeingEdited, updateWalkBeingEdited)}>
                <input type="file" name="walk-audio"
                    accept=".mp3" 
                    encType="multipart/form-data" />
                <button type="submit">Submit</button>
            </form>
        <div>
            <Link to="/previewwalk">Preview</Link>
            <Link to="/addpois">Add POIs</Link>
        </div>
    </div>
let submitWalkThumbnail = async (event, walk, updateWalkBeingEdited) => {
    event.preventDefault();
    let walkThumbnail = event.target['walk-thumbnail'].files[0];
    let result = await postWalkThumbnail(walk.id, walkThumbnail);
    let newWalk = {...walk, thumbnail: result}
    updateWalkBeingEdited(newWalk);
}

let submitWalkVideo = async (event, walk, updateWalkBeingEdited) => {
    event.preventDefault();
    let walkVideo = event.target['walk-video'].files[0];
    let result = await postWalkVideo(walk.id, walkVideo);
    let newWalk = {...walk, video: result}
    updateWalkBeingEdited(newWalk);
}

let submitWalkAudio = async (event, walk, updateWalkBeingEdited) => {
    event.preventDefault();
    let walkAudio = event.target['walk-audio'].files[0];
    let result = await postWalkAudio(walk.id, walkAudio);
    let newWalk = {...walk, audio: result}
    updateWalkBeingEdited(newWalk);
}

let isThereVideo = (walkBeingEdited) => {
    if (walkBeingEdited.video) {
        return(
            <video width="360" height="360" controls>
                <source src={'http://localhost:5000/' + walkBeingEdited.video} type="video/mp4" />
            </video>)
    }
}

let isThereAudio = (walkBeingEdited) => {
    if (walkBeingEdited.video) {
        return(
            <audio controls className="audio" >
                <source src={'http://localhost:5000/' + walkBeingEdited.audio} type="audio/mpeg" />
            </audio>)
    }
}

let mapStateToProps = (state) =>
    ({
        walkBeingEdited: state.walkBeingEdited,
    })

let mapDispatchToProps = (dispatch) =>
    ({ 
        updateWalkBeingEdited: (walk) => dispatch(updateWalkBeingEdited(walk)),
    })

let EditWalk = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditWalkDumb);

export default EditWalk;