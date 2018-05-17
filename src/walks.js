import React from 'react';
import { connect } from 'react-redux';
import { 
        updateSearchLocation,
        updateTitleGuideInput,
        updateTitleGuideResults,
        updateWalkSearchResults,
        updateWalkBeingViewed,
        updatePoisBeingViewed,
     } from './reducer-handlers';
import {
    getGuideOrTitle,
    getResultsWithinDistance,
    getWalk,
} from './fetch-data'
import WalkStartLocationSearch from './walk-location-search';
import SearchTitleGuideResults from './search-title-guide-results';
import WalkCard from './walk-card';

let WalksDumb = ({  searchLocation, 
                    updateSearchLocation, 
                    currentLocation, 
                    titleGuideInput,
                    updateTitleGuideInput,
                    updateTitleGuideResults,
                    walkSearchResults,
                    updateWalkSearchResults,
                    history,
                    updateWalkBeingViewed,
                    updatePoisBeingViewed,
                 }) =>
    <div className="poi-form">
        <input className="full-width" placeholder="Search by Title or Guide"
            value={titleGuideInput} onChange={(event) => {
                updateTitleGuideInput(event.target.value);
                if (event.target.value) {
                    getGuideOrTitle(event.target.value)
                    .then(results => updateTitleGuideResults(results))
                } else {
                    updateTitleGuideResults([])
                }
                }} />
        <SearchTitleGuideResults />
        <WalkStartLocationSearch />
        <button onClick={() => updateSearchLocation(currentLocation)}
        >Use Current Location</button>
        {
            showSearchLocation(searchLocation)
        }
        <form className="poi-form" onSubmit={
            (event) => {
                event.preventDefault();
                let searchParams = {
                    miles: event.target.miles.value,
                    lat: searchLocation.lat,
                    long: searchLocation.long,
                    limit: event.target.limit.value,
                    sortby: event.target.sortby.value,
                }
                getResultsWithinDistance(searchParams)
                .then(results => updateWalkSearchResults(results))
        }}>
            <div className="options">
                <h2>Results Within</h2>
                <select name="miles">
                    <option value="1">1 mi</option>
                    <option value="5">5 mi</option>
                    <option value="10">10 mi</option>
                    <option value="25">25 mi</option>
                    <option value="all">All</option>
                </select>
            </div>
            <div className="search-types">
                <div className="options">
                    <h2>Sort By</h2>
                    <select name="sortby">
                        <option value="distance">Distance To</option>
                        <option value="length">Length</option>
                    </select>
                </div>
                <div className="options">
                    <h2>Number of Results</h2>
                    <select name="limit">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="100">100</option>
                        <option value="all">All</option>
                    </select>
                </div>
            </div>
            <button type="submit">Get Results</button>
        </form>
        {
            walkSearchResults.map(walk => 
                <div key={walk.id} onClick={async () => {
                    let result = await getWalk(walk.id);
                    updateWalkBeingViewed(result.walk);
                    updatePoisBeingViewed(result.pois);
                    history.push('/viewwalk')
                }}>
                    <WalkCard walk={walk} />
                </div>
            )
        }
    </div>

let showSearchLocation = (searchLocation) => {
    if (searchLocation) {
        return <div className="display-flex full-width">
                    <input className="half-width" name="lat" value={searchLocation.lat} />
                    <input className="half-width" name="long" value={searchLocation.long} />
                </div>
    }
}

let mapStateToProps = (state) => 
    ({
        searchLocation: state.searchLocation,
        currentLocation: state.currentLocation,
        titleGuideInput: state.titleGuideInput,
        walkSearchResults: state.walkSearchResults,
    })

let mapDispatchToProps = (dispatch) =>
    ({
        updateSearchLocation: (locationObject) => dispatch(updateSearchLocation(locationObject)),
        updateTitleGuideInput: (input) => dispatch(updateTitleGuideInput(input)),
        updateTitleGuideResults: (array) => dispatch(updateTitleGuideResults(array)),
        updateWalkSearchResults: (array) => dispatch(updateWalkSearchResults(array)),
        updateWalkBeingViewed: (object) => dispatch(updateWalkBeingViewed(object)),
        updatePoisBeingViewed: (array) => dispatch(updatePoisBeingViewed(array)),
    })

let Walks = connect(
    mapStateToProps,
    mapDispatchToProps
)(WalksDumb);

export default Walks;