import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    postWalkThumbnail,
    postWalkVideo,
    postWalkAudio,
    getWalkPois,
} from './fetch-data';
import {
    updateWalkBeingEdited,
    updateEditablePois,
} from './reducer-handlers';
import { server } from './variables';

let EditWalkDumb = ({ walkBeingEdited, updateWalkBeingEdited, updateEditablePois }) =>
    <div className="edit-walk">
        <h2 className="self-center"><strong>Step 2:</strong> Introduce Your Walk!</h2>
        <div className="walk-thumbnail-container" >
            <img className="thumbnail" alt="Walk Thumbnail"
                 src={server + '/' + walkBeingEdited.thumbnail} />
        </div>
        <h4>Add/Change Walk Thumbnail</h4>
            <form className="edit-walk" onSubmit ={(event) => submitWalkThumbnail(event, walkBeingEdited, updateWalkBeingEdited)}>
                <input type="file" name="walk-thumbnail"
                        accept=".png, .jpg, .jpeg, .gif" 
                        encType="multipart/form-data" />
                <button type="submit">Submit</button>
            </form>
        <h4>Title: {walkBeingEdited.title}</h4>
        <form className="edit-walk" onSubmit={(event) => 
                submitWalkTitle(event, walkBeingEdited.id, updateWalkBeingEdited)}>
            <input type="text" name="title" />
            <button>Submit</button>
        </form>
        <h4>Description</h4>
        <p>{walkBeingEdited.description}</p>
        <form className="edit-walk" onSubmit={(event) => 
                submitWalkDescription(event, walkBeingEdited.id, updateWalkBeingEdited)}>
            <textarea name="description" />
            <button>Submit</button>
        </form>
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
            <Link to="/previewwalk"><button>Preview</button></Link>
            <Link to="/addpois" 
                onClick={() => getPois(updateEditablePois, walkBeingEdited.id)}
            ><button>Add POIs</button></Link>
        </div>
    </div>

let getPois = async (updateEditablePois, walkId) => {
    let result = await getWalkPois(walkId);
    updateEditablePois(result);
}   

let submitWalkTitle = async (event, id, updateWalkBeingEdited) => {
    event.preventDefault();
}

let submitWalkDescription = async (event, id, updateWalkBeingEdited) => {
    event.preventDefault();
}

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

export let isThereVideo = (walkBeingEdited) => {
    if (walkBeingEdited.video) {
        return(
            <video width="360" height="360" controls>
                <source src={server + "/" + walkBeingEdited.video} type="video/mp4" />
            </video>)
    }
}

export let isThereAudio = (walkBeingEdited) => {
    if (walkBeingEdited.audio) {
        return(
            <audio controls className="audio" >
                <source src={server + "/" + walkBeingEdited.audio} 
                    type="audio/mpeg" />
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
        updateEditablePois: (pois) => dispatch(updateEditablePois(pois)),
    })

let EditWalk = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditWalkDumb);

export default EditWalk;