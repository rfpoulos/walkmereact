import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import {
        withScriptjs,
} from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import Map from './google-map';
import { postPoi } from './fetch-data';
require('dotenv').config();

let PoiSearchBoxDumb = ({ 
                            onSearchBoxMounted, 
                            bounds, 
                            onPlacesChanged, 
                            places, 
                            walkBeingEdited, 
                            addEditablePoi, 
                            editablePois 
                        }) =>
    <div data-standalone-searchbox="">
        <form className="poi-form" 
                onSubmit={(event) => 
                            submitPoi(event, walkBeingEdited.id, addEditablePoi, editablePois.length)
                        }>
            <input type="text" name="title" placeholder="Title" />
            <StandaloneSearchBox
                ref={onSearchBoxMounted}
                bounds={bounds}
                onPlacesChanged={onPlacesChanged}
            >
            <input
                type="text"
                placeholder="Search for POI"
            />
            </StandaloneSearchBox>
            <ol>
            {places.map(({ place_id, formatted_address, geometry: { location } }) =>
                <div key={place_id}>
                    <input name="address" defaultValue={formatted_address}/>
                    <div>
                        <input name="lat" defaultValue={location.lat()} />
                        <input name="long" defaultValue={location.lng()} />
                    </div>
                </div>
            )}
            </ol>
            <button type="submit">Submit</button>
        </form>
        <Map displayedPois={editablePois} />
    </div>

let submitPoi = async (event, walkid, addEditablePoi, position) => {
    event.preventDefault();
    let poiData = {
        walkid,
        title: event.target.title.value,
        lat: event.target.lat.value,
        long: event.target.long.value,
        address: event.target.address.value,
        position,
    }
    let newPoi = await postPoi(poiData);
    addEditablePoi(newPoi);
}

let PoiSearchBox = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?
                    key=${process.env.GOOGLE_API_KEY}
                    &v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
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
  }),
  withScriptjs  
)(PoiSearchBoxDumb);

export default PoiSearchBox;
