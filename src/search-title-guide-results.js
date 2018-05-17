import React from 'react';
import { connect } from 'react-redux';
import { 
        updateWalkSearchResults, 
        updateTitleGuideInput, 
        updateTitleGuideResults
     } from './reducer-handlers';
import { getResultClick } from './fetch-data';

let SearchTitleGuideResultsDumb = ({ 
                                    titleGuideResults, 
                                    updateWalkSearchResults, 
                                    updateTitleGuideInput, 
                                    updateTitleGuideResults
                                 }) =>
    <div className="full-width">
    {
        titleGuideResults.map(result =>
            <h2 key={result.result} className="low-margin"
                onClick={() => {
                    getResultClick(result.result)
                    .then(results => updateWalkSearchResults(results));
                    updateTitleGuideInput('');
                    updateTitleGuideResults([]);
                }}
            >{result.result}</h2>
        )
    }
    </div>

let mapStateToProps = (state) => 
    ({
        titleGuideResults: state.titleGuideResults,
    })

let mapDispatchToProps = (dispatch) =>
    ({
        updateWalkSearchResults: (results) => dispatch(updateWalkSearchResults(results)),
        updateTitleGuideInput: (input) => dispatch(updateTitleGuideInput(input)),
        updateTitleGuideResults: (input) => dispatch(updateTitleGuideResults(input)),
    })

let SearchTitleGuideResults = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchTitleGuideResultsDumb);

export default SearchTitleGuideResults;