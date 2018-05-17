import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isThereAudio, isThereVideo } from './edit-walk';
import {
    postPoiThumbnail,
    postPoiVideo,
    postPoiAudio,
    postPoiNextAudio,
    getWalkPois,
    postPoiDescription,
    postPoiTitle,
} from './fetch-data';
import {
    updatePoiBeingEdited,
    updateEditablePois,
} from './reducer-handlers';

import { server } from './variables';

let EditPoiDumb = ({ poiBeingEdited, updatePoiBeingEdited, updateEditablePois }) =>
    <div className="edit-walk">
        <h2 className="self-center">
            Edit POI
        </h2>
        <div className="walk-thumbnail-container" >
            <img className="thumbnail" alt="POI Thumbnail"
                 src={server + '/' + poiBeingEdited.thumbnail} />
        </div>
        <h4>Add/Change Poi Thumbnail</h4>
            <form className="edit-walk" onSubmit ={(event) => 
                submitPoiThumbnail(event, poiBeingEdited, updatePoiBeingEdited)}>
                <input type="file" name="poi-thumbnail"
                        accept=".png, .jpg, .jpeg, .gif" 
                        encType="multipart/form-data" />
                <button type="submit">Submit</button>
            </form>
        <h4>Edit Title</h4>
        <h2>{poiBeingEdited.title}</h2>
        <form className="edit-walk" onSubmit={(event) => 
                submitPoiTitle(event, poiBeingEdited.id, updatePoiBeingEdited)}>
            <input type="text" name="title" />
            <button>Submit</button>
        </form>
        <h4>Description</h4>
        <p>{poiBeingEdited.description}</p>
        <form className="edit-walk" onSubmit={(event) => 
                submitPoiDescription(event, poiBeingEdited.id, updatePoiBeingEdited)}>
            <textarea name="description" />
            <button>Submit</button>
        </form>
        <h4>Add/Change Video</h4>
        {
            isThereVideo(poiBeingEdited)
        }
            <form className="edit-walk" onSubmit={(event) => 
                submitPoiVideo(event, poiBeingEdited, updatePoiBeingEdited)}>
                <input type="file" name="poi-video"
                    accept=".wmv, .avi, .mov, .mpeg, .mp4" 
                    encType="multipart/form-data" />
                <button type="submit">Submit</button>
            </form>
        <h4>Add/Change Audio</h4>
        {
            isThereAudio(poiBeingEdited)
        }
            <form className="edit-walk" onSubmit={(event) => 
                submitPoiAudio(event, poiBeingEdited, updatePoiBeingEdited)}>
                <input type="file" name="poi-audio"
                    accept=".mp3" 
                    encType="multipart/form-data" />
                <button type="submit">Submit</button>
            </form>
        <h4>Add/Change Audio For In Between POIs</h4>
            {
                isThereNextAudio(poiBeingEdited)
            }
            <form className="edit-walk" onSubmit={(event) => 
                submitPoiNextAudio(event, poiBeingEdited, updatePoiBeingEdited)}>
                <input type="file" name="poi-next-audio"
                    accept=".mp3" 
                    encType="multipart/form-data" />
                <button type="submit">Submit</button>
            </form>
        <div>
            <Link onClick={() => {
                getWalkPois(poiBeingEdited.walkid)
                .then(data => updateEditablePois(data))
            }} to="/addpois"><button>Return to Add Pois</button></Link>
        </div>
    </div>

let isThereNextAudio = (poiBeingEdited) => {
    if (poiBeingEdited['next_audio']) {
        return(
            <audio controls className="audio" >
                <source src={server + '/' + poiBeingEdited.next_audio} type="audio/mpeg" />
            </audio>)
    }
}

let submitPoiTitle = async (event, id, updatePoiBeingEdited) => {
    event.preventDefault();
    let title = event.target.title.value;
    let result = await postPoiTitle({ id, title });
    updatePoiBeingEdited(result);
}

let submitPoiDescription = async (event, id, updatePoiBeingEdited) => {
    event.preventDefault();
    let description = event.target.description.value;
    let result = await postPoiDescription({ id, description });
    updatePoiBeingEdited(result);
}

let submitPoiThumbnail = async (event, poi, updatePoiBeingEdited) => {
    event.preventDefault();
    let poiThumbnail = event.target['poi-thumbnail'].files[0];
    let result = await postPoiThumbnail(poi.id, poiThumbnail);
    let newPoi = {...poi, thumbnail: result}
    updatePoiBeingEdited(newPoi);
}

let submitPoiVideo = async (event, poi, updatePoiBeingEdited) => {
    event.preventDefault();
    let poiVideo = event.target['poi-video'].files[0];
    let result = await postPoiVideo(poi.id, poiVideo);
    let newPoi = {...poi, video: result}
    updatePoiBeingEdited(newPoi);
}

let submitPoiAudio = async (event, poi, updatePoiBeingEdited) => {
    event.preventDefault();
    let poiAudio = event.target['poi-audio'].files[0];
    let result = await postPoiAudio(poi.id, poiAudio);
    let newPoi = {...poi, audio: result}
    updatePoiBeingEdited(newPoi);
}

let submitPoiNextAudio = async (event, poi, updatePoiBeingEdited) => {
    event.preventDefault();
    let poiNextAudio = event.target['poi-next-audio'].files[0];
    let result = await postPoiNextAudio(poi.id, poiNextAudio);
    let newPoi = {...poi, next_audio: result}
    updatePoiBeingEdited(newPoi);
}

let mapStateToProps = (state) =>
    ({
        poiBeingEdited: state.poiBeingEdited,
    })

let mapDispatchToProps = (dispatch) =>
    ({ 
        updatePoiBeingEdited: (poi) => dispatch(updatePoiBeingEdited(poi)),
        updateEditablePois: (payload) => dispatch(updateEditablePois(payload)),
    })

let EditPoi = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPoiDumb);

export default EditPoi;