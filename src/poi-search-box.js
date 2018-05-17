import React from 'react';
import { compose, withProps, lifecycle, withState } from 'recompose';
import {
        withScriptjs,
} from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import Map from './direction-renderer';
import { postPoi } from './fetch-data';

let PoiSearchBoxDumb = ({ 
                            onSearchBoxMounted, 
                            bounds, 
                            onPlacesChanged, 
                            places, 
                            walkBeingEdited, 
                            addEditablePoi, 
                            editablePois,
                            poiForm,
                            setPoiForm,
                            onSubmitForm,
                        }) =>
    <div data-standalone-searchbox="">
        <form className="poi-form" 
            onSubmit={(event) =>  
                        submitPoi(event, walkBeingEdited.id, 
                            addEditablePoi, editablePois.length, 
                            setPoiForm, onSubmitForm)
                    }>
            <input value={poiForm.title} maxlength="30" onChange={(event) => 
                setPoiForm({...poiForm, title: event.target.value})} className="full-width" type="text" name="title" placeholder="Title" />
            <div>
                <StandaloneSearchBox
                    ref={onSearchBoxMounted}
                    bounds={bounds}
                    onPlacesChanged={onPlacesChanged}  
                    >
                    <input
                        type="text"
                        placeholder="Search for POI"
                        className="full-width"
                        value={poiForm.search}
                        onChange={(event) => setPoiForm({...poiForm, search: event.target.value})}
                    />
                </StandaloneSearchBox>
                {places.map(({ place_id, formatted_address, geometry: { location } }) =>
                    <div className="poi-form" key={place_id}>
                        <input defaultValue={formatted_address}
                            className="full-width" name="address"/>
                        <div className="display-flex full-width">
                            <input className="half-width" name="lat" defaultValue={location.lat()} />
                            <input className="half-width" name="long" defaultValue={location.lng()} />
                        </div>
                    </div>
                )}
            </div>
            {
                shouldSubmitShow(places)
            }
        </form>
        {
            shouldMapShow(editablePois)
        }
    </div>

let shouldMapShow = (editablePois) => {
    if (editablePois[0]) {
        return <Map displayedPois={editablePois} editMode="true" />
    }
}

let submitPoi = async (event, walkid, addEditablePoi, 
        position, setPoiForm, onSubmitForm) => {
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
    addEditablePoi(newPoi)
    setPoiForm({title: '', search: ''});
    onSubmitForm();
}

let shouldSubmitShow = (places) => {
    if (places[0]) {
        return <button type="submit">Submit</button>
    }
}

let PoiSearchBox = compose(
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
        onSubmitForm: () => {
            this.setState({
                places: [],
            })
        }
      })
    },
  }),
  withState('poiForm', 'setPoiForm', {})  

)(PoiSearchBoxDumb);

export default PoiSearchBox;
