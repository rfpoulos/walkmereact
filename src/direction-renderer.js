import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from 'react-google-maps';
import { googleApiKey } from './variables';
import { updateWalkLength } from './fetch-data';

let MapWithADirectionsRendererDumb = ({ directions }) => 
    <GoogleMap
    defaultZoom={7}
    >
    {directions && <DirectionsRenderer directions={(directions)} />}
    </GoogleMap>

let newWalkLength = (directions, walkid) => {
    let legs = directions.routes[0].legs
    let length = 0;
    legs.forEach(leg => length += leg.distance.value);
    updateWalkLength({ length, walkid });
}

let MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?
                    key=${googleApiKey}
                    &v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, width: '360px' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new window.google.maps.DirectionsService();

      DirectionsService.route({
        origin: new window.google.maps.LatLng(
            this.props.displayedPois[0].lat, this.props.displayedPois[0].long),
        destination: new window.google.maps.LatLng(
            this.props.displayedPois.slice(-1)[0].lat, this.props.displayedPois.slice(-1)[0].long),
        travelMode: window.google.maps.TravelMode.WALKING,
        waypoints: this.props.displayedPois.slice(1, this.props.displayedPois.length - 1)
            .map(element => ({
                location: new window.google.maps.LatLng(element.lat, element.long),
            })),
      }, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    },
    componentDidUpdate(prevProps) {
      if ((JSON.stringify(prevProps.displayedPois) !== 
          JSON.stringify(this.props.displayedPois) &&
          this.props.editMode)) {
        const DirectionsService = new window.google.maps.DirectionsService();
  
        DirectionsService.route({
          origin: new window.google.maps.LatLng(
              this.props.displayedPois[0].lat, this.props.displayedPois[0].long),
          destination: new window.google.maps.LatLng(
              this.props.displayedPois.slice(-1)[0].lat, this.props.displayedPois.slice(-1)[0].long),
          travelMode: window.google.maps.TravelMode.WALKING,
          waypoints: this.props.displayedPois.slice(1, this.props.displayedPois.length - 1)
            .map(element => ({
                location: new window.google.maps.LatLng(element.lat, element.long),
            })),
        }, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            newWalkLength(result, this.props.displayedPois[0].walkid);
            this.setState({
              directions: result,
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
      }
    }
  })
)(MapWithADirectionsRendererDumb);

export default MapWithADirectionsRenderer;