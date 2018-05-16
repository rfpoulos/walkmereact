import React from 'react';
import { server } from './variables';
import arrow from './images/location-arrow.svg';
import marker from './images/map-marker-alt.svg';
import length from './images/walking.svg';
import { connect } from 'react-redux';

let WalkCardDumb = ({ walk, currentLocation }) =>
    <div className="walks">
        <div className="poi-thumbnail">
            <img className="thumbnail" 
                src={server + '/' + walk.thumbnail} 
                alt="Walk Thumbnail" 
            />
        </div>
        <div className="poi-info">
            <div className="title-container">
                <h2 className="low-margin">{walk.title}</h2>
                {
                    shouldDistanceShow(walk.lat, walk.long, currentLocation)
                }
            </div>
            <div className="icon-info">
                <div className="walk-icons">
                    <img className="thumbnail" 
                    src={server + '/' + walk.guidethumbnail} alt="Guide" />
                </div>
                <p>{walk.username}</p>
            </div>
            <div className="icon-info">
                <img className="walk-icons" src={marker} alt="marker" />
                <h6 className="low-margin">{walk.address}</h6>
            </div>
            <div className="icon-info">
                <img className="walk-icons" src={length} alt="length" />
                <p>{Math.round(walk.length / 16.09344) / 100 + ' mi'}</p>
            </div>
        </div>
    </div>

let shouldDistanceShow = (lat, long, currentLocation) => {
    if (currentLocation) {
        return (
            <div className="icon-info">
                <img className="walk-icons" src={arrow} alt="arrow" />
                <p>{
                    Math.round(calculateDistance(lat, currentLocation.lat, long, currentLocation.long) / 10) / 100 + ' mi'
                }</p>
            </div>)
    }
}

let calculateDistance = (lat1, lat2, long1, long2) => {
    let R = 6378137; // Earth’s mean radius in meter
    let dLat = rad(lat2 - lat1);
    let dLong = rad(long2 - long1);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(lat1)) * Math.cos(rad(lat2)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
}

let rad = (x) => {
    return x * Math.PI / 180;
  };

let mapStateToProps = (state, { walk }) => {
    return {
        walk,
        currentLocation: state.currentLocation,
     };
}

let mapDispatchToProps = (dispatch) =>
    ({
    })

let WalkCard = connect(
    mapStateToProps,
    mapDispatchToProps
)(WalkCardDumb);

export default WalkCard;