import React from 'react';
import { connect } from 'react-redux';
import { server } from './variables';
import { updatePoiBeingViewed } from './reducer-handlers';

let NextAudioDumb = ({ poiBeingViewed, poisBeingViewed, history }) => 
    <div className="profile">
        <h2>On way to: {poisBeingViewed[poiBeingViewed.position + 1].title}</h2>
        <audio controls className="audio" >
            <source src={server + "/" + poiBeingViewed['next_audio']} 
                type="audio/mpeg" />
        </audio>
        <button onClick={
            () => {
                updatePoiBeingViewed(poisBeingViewed[poiBeingViewed.position + 1]);
                history.push('/viewpoi')
            }
        }>Arrived</button>
    </div>

let mapStateToProps = (state, { history }) => 
    ({
        poisBeingViewed: state.poisBeingViewed,
        poiBeingViewed: state.poiBeingViewed,
        history
    })

let mapDispatchToProps = (dispatch) =>
    ({
        updatePoiBeingViewed: (poi) => dispatch(updatePoiBeingViewed(poi)),
    })

let NextAudio = connect(
    mapStateToProps,
    mapDispatchToProps
)(NextAudioDumb);

export default NextAudio;