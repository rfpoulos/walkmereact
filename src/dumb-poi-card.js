import React from 'react';
import microphone from './images/microphone.svg';
import video from './images/video.svg';
import { server } from './variables';

let DumbPoiCard = ({poi, deleteButton}) =>
    <div className="editable-poi">
        <div className="poi-thumbnail">
            <img className="thumbnail" 
                src={server + '/' + poi.thumbnail} 
                alt="POI Thumbnail" 
            />
        </div>
        <div className="poi-info">
            <div className="delete-container">
                <h2 className="low-margin">{poi.title}</h2>
                {
                    deleteButton()
                }
            </div>
            <h6 className="low-margin">{poi.address.split(",", 1)}</h6>
            <h6 className="low-margin">{poi.address.split(",").splice(1)}</h6>
            <h6 className="low-margin">{`{${parseFloat(poi.lat).toPrecision(10)}, 
                                            ${parseFloat(poi.long).toPrecision(10)}}`}</h6>
            <div className="display-flex">
            {
                shouldMicrophoneDisplay(poi)
            }
            {
                shouldVideoDisplay(poi)
            }
            </div>
        </div>
    </div>

let shouldMicrophoneDisplay = (poi) => {
    if (poi.audio || poi.next_audio) {
        return <img className="poi-images" src={microphone} alt="Audio Available" />
    }
}

let shouldVideoDisplay = (poi) => {
    if (poi.audio || poi.next_audio) {
        return <img className="poi-images" src={video} alt="Video Available" />
    }
}

export default DumbPoiCard;