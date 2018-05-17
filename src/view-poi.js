import React from 'react';
import { connect } from 'react-redux';
import { server } from './variables';
import { updatePoiBeingViewed } from './reducer-handlers';

let viewPoiDumb = ({ poisBeingViewed, poiBeingViewed, currentLocation, history, updatePoiBeingViewed}) =>
    <div className="profile">
        <div className="profile-photo">
            <img className="thumbnail" src={server + '/' + poiBeingViewed.thumbnail} />
        </div>
        <h1>{poiBeingViewed.title}</h1>
        <hr width="75%"/>
        <h2>Description</h2>
        <p>{poiBeingViewed.description}</p>
        <hr width="75%"/>
        {
            videoShow(poiBeingViewed.video)
        }
        {
            audioShow(poiBeingViewed.audio)
        }
        <button onClick={
            () => {
                window.open(`http://maps.google.com/maps?dirflg=w
                        &saddr=${currentLocation.lat},${currentLocation.long}
                        &daddr=${poisBeingViewed[poiBeingViewed.position + 1].lat},
                        ${poisBeingViewed[poiBeingViewed.position + 1].long}`)
                if (poiBeingViewed['next_audio']) {
                    history.push('/nextaudio')
                } else {
                    updatePoiBeingViewed(poisBeingViewed[poiBeingViewed.position + 1]);
                }
            }
        }>Next POI</button>
    </div>

let audioShow = (audio) => {
    if (audio) {
        return (
            <div className="poi-form">
                <h2>Audio</h2>
                <audio controls className="audio" >
                    <source src={server + "/" + audio} 
                    type="audio/mpeg" />
                </audio>
                <hr width="75%" />
            </div>
        )
    }
}

let videoShow = (video) => {
    if (video) {
        return (
            <div className="poi-form">
                <h2>Video</h2>
                <video width="360" height="360" controls>
                 <source src={server + "/" + video} type="video/mp4" />
                </video>
            </div>
        )
    }
}

let mapStateToProps = (state, { history }) => 
    ({
        poisBeingViewed: state.poisBeingViewed,
        poiBeingViewed: state.poiBeingViewed,
        currentLocation: state.currentLocation,
        history
    })

let mapDispatchToProps = (dispatch) =>
    ({
        updatePoiBeingViewed: (poi) => dispatch(updatePoiBeingViewed(poi)),
    })

let viewPoi = connect(
    mapStateToProps,
    mapDispatchToProps
)(viewPoiDumb);

export default viewPoi;