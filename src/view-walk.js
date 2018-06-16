import React from 'react';
import { connect } from 'react-redux';
import { server } from './variables';
import PoiCard from './dumb-poi-card';
import MapWithADirectionsRenderer from './direction-renderer';
import dottedLine from './images/Dotted-line.png';
import { 
            updatePoiBeingViewed, 
            updateProfileBeingViewed,
        } from './reducer-handlers';
import {
    getProfile,
} from './fetch-data';

let viewWalkDumb = ({ 
                        walkBeingViewed, 
                        poisBeingViewed, 
                        currentLocation, 
                        history, 
                        updatePoiBeingViewed,
                        updateProfileBeingViewed,
                     }) =>
    <div className="profile">
        <div className="profile-photo">
            <img className="thumbnail" src={server + '/' + walkBeingViewed.thumbnail} />
        </div>
        <h1>{walkBeingViewed.title}</h1>
        <div className="display-flex" onClick={
            async () => {
                let result = await getProfile(walkBeingViewed.username);
                updateProfileBeingViewed(result);
                history.push('/profile');
            }
        }>
            <h2>Guided By: <strong>{walkBeingViewed.username}</strong></h2>
            <div className="menu-picture padding">
                <img className="thumbnail" alt="Guide's Picture" src={server + '/' + walkBeingViewed.guidethumbnail} />
            </div>
        </div>
        <hr width="75%"/>
        <h2>Description</h2>
        <p>{walkBeingViewed.description}</p>
        <hr width="75%"/>
        {
            videoShow(walkBeingViewed.video)
        }
        {
            audioShow(walkBeingViewed.audio)
        }
        <h2>Points of Interest</h2>
        {
            poisBeingViewed.map(poi =>
                <div key={poi.id} className="column-center">
                    <PoiCard poi={poi} deleteButton={() => <div></div>}/>
                    <img className="dotted-line" src={dottedLine} alt="" />
                </div>
            )
        }
        <button onClick={() => {
            window.open(`http://maps.google.com/maps?dirflg=w
                        &saddr=${currentLocation.lat},${currentLocation.long}
                        &daddr=${poisBeingViewed[0].lat},${poisBeingViewed[0].long}`)
            updatePoiBeingViewed(poisBeingViewed[0]);
            history.push('/viewpoi')
        }}>Begin Walk</button>
        <MapWithADirectionsRenderer displayedPois={poisBeingViewed} />
    </div>

let audioShow = (audio) => {
    if (audio) {
        return (
            <div className="poi-form">
                <h2>Audio Introduction</h2>
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
                <h2>Video Introduction</h2>
                <video width="360" height="360" controls>
                 <source src={server + "/" + video} type="video/mp4" />
                </video>
            </div>
        )
    }
}

let mapStateToProps = (state, { history }) => 
    ({
        walkBeingViewed: state.walkBeingViewed,
        poisBeingViewed: state.poisBeingViewed,
        currentLocation: state.currentLocation,
        history
    })

let mapDispatchToProps = (dispatch) =>
    ({
        updatePoiBeingViewed: (poi) => dispatch(updatePoiBeingViewed(poi)),
        updateProfileBeingViewed: (user) => dispatch(updateProfileBeingViewed(user)),
    })

let viewWalk = connect(
    mapStateToProps,
    mapDispatchToProps
)(viewWalkDumb);

export default viewWalk;