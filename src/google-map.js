
import React from 'react';
import { compose, withProps, withState, withHandlers } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
require('dotenv').config();

let MapDumb = ({ 
                zoom, 
                onMapMounted, 
                onZoomChanged, 
                displayedPois, 
                onToggleOpen,
                onFitBounds,
            }) =>
    <GoogleMap
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    zoom={zoom}
    ref={onMapMounted}
    onZoomChanged={onZoomChanged}
    onFitBounds={onFitBounds}
    >
    {
        displayedPois.map((poi, i) =>
        <Marker
            position={{ lat: parseFloat(poi.lat), lng: parseFloat(poi.long) }}
            onClick={onToggleOpen}
            key={i}
            >
            <InfoWindow onCloseClick={onToggleOpen}>
                <div>
                    <h2>{poi.title}</h2>
                </div>
            </InfoWindow>
        </Marker>)
    }
    </GoogleMap>

let Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?
                    key=${process.env.GOOGLE_API_KEY}
                    =3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `360px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  
  withState('zoom', 'onZoomChange', 14),
  withHandlers(() => {
    const refs = {
      map: undefined,
    }

    return {
      onMapMounted: () => ref => {
        refs.map = ref
      },
      onZoomChanged: ({ onZoomChange }) => () => {
        onZoomChange(refs.map.getZoom())
      }
    }
  }),
  withScriptjs,
  withGoogleMap
)(MapDumb);

export default Map;