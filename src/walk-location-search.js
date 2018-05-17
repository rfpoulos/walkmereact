import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import {
        withScriptjs,
} from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { updateSearchLocation } from './reducer-handlers';
import { connect } from 'react-redux';

let WalkStartLocationSearchJSX = ({ 
                            onSearchBoxMounted, 
                            bounds, 
                            onPlacesChanged, 
                            places,
                            updateSearchLocation,
                        }) =>
    <div data-standalone-searchbox="">
        <StandaloneSearchBox
            ref={onSearchBoxMounted}
            bounds={bounds}
            onPlacesChanged={onPlacesChanged}  
            >
            <input
                type="text"
                placeholder="Enter Start Location"
                className="full-width"
            />
        </StandaloneSearchBox>
    </div>

let WalkStartLocationDumb = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?
                    key=${process.env.GOOGLE_API_KEY}
                    &v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  withScriptjs,
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();

          this.setState({
            places,
          });
        },
      })
    },
    componentDidUpdate(prevProps) {
        if ((prevProps.places !== this.state.places) && this.state.places[0]) {
            let lat = this.state.places[0].geometry.location.lat();
            let long =  this.state.places[0].geometry.location.lng();
            this.props.updateSearchLocation({ lat, long });
        }
    },
  })
)(WalkStartLocationSearchJSX);

let mapStateToProps = (state) => 
    ({
    })

let mapDispatchToProps = (dispatch) =>
    ({
        updateSearchLocation: (locationObject) => dispatch(updateSearchLocation(locationObject))
    })

let WalkStartLocationSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(WalkStartLocationDumb);

export default WalkStartLocationSearch;
