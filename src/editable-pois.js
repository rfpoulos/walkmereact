import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import dottedLine from './images/Dotted-line.png';
import uparrow from './images/angle-double-up.svg';
import downarrow from './images/angle-double-down.svg';
import times from './images/times.svg'
import { 
        updateEditablePois,
        updatePoiBeingEdited,
     } from './reducer-handlers';
import { 
        updatePoiPositions,
        deletePoi,    
    } from './fetch-data';
import PoiCard from './dumb-poi-card';

let EditablePoisDumb = ({ 
                            editablePois, 
                            poiBeingEdited, 
                            updateEditablePois,
                            updatePoiBeingEdited,
                        }) =>
    <div>
    {
        editablePois.map(poi =>
            <div key={poi.id}>
                <div className="poi-div">
                    <PoiCard poi={poi} deleteButton={() => deleteButton(poi.id, updateEditablePois)}/>
                    <div className="arrows">
                    {
                        shouldUpArrowDisplay(poi, editablePois, updateEditablePois)
                    }
                    {
                        shouldDownArrowDisplay(poi, editablePois, updateEditablePois)
                    }
                    </div>
                </div>
                <div className="column-center">
                    <Link onClick={() => updatePoiBeingEdited(poi)}
                        to={`/editpoi/${poi.id}`}>Edit this POI</Link>
                    <img className="dotted-line" src={dottedLine} alt="" />
                </div>
            </div>
        )
    }
    </div>

let shouldUpArrowDisplay = (poi, editablePois, updateEditablePois) => {
    if (poi.id !== editablePois[0].id) {
        return <img className="arrow" src={uparrow} alt="Up Arrow"
            onClick={() => moveUp(poi, editablePois, updateEditablePois)} />
    }
}

let shouldDownArrowDisplay = (poi, editablePois, updateEditablePois) => {
    if (poi.id !== editablePois[editablePois.length - 1].id) {
        return <img className="arrow" src={downarrow} alt="Down Arrow"
        onClick={() => moveDown(poi, editablePois, updateEditablePois)} />
    }
}

let deleteButton = (id, updateEditablePois) =>
    <img className="delete" src={times} alt="Delete"
        onClick={() => removePoi(id, updateEditablePois)} />

let moveUp = (poi, editablePois, updateEditablePois) => {
    let pois = [];
    let firstArray = editablePois.map(element => {
        if(element.position === poi.position - 1) {
            element.position += 1;
            pois.push(element);
        }
        return element
        });
    let secondArray = firstArray.map(element => {
        if(element.id === poi.id) {
            element.position -= 1;
            pois.push(element);
        }
        return element;
        });
    let newEditablePois = [];
    secondArray.map(element => 
        newEditablePois[element.position] = element);
    updatePoiPositions(pois)
    .then(data => updateEditablePois(data));
}

let moveDown = (poi, editablePois, updateEditablePois) => {
    let pois = [];
    let firstArray = editablePois.map(element => {
        if(element.position === poi.position + 1) {
            element.position -= 1;
            pois.push(element);
        }
        return element;
        });
    let secondArray = firstArray.map(element => {
        if(element.id === poi.id) {
            element.position += 1;
            pois.push(element);
        }
        return element;
        });
    let newEditablePois = [];
    secondArray.map(element => 
        newEditablePois[element.position] = element);
    updatePoiPositions(pois)
    .then(data => updateEditablePois(data));
}

let removePoi = (id, updateEditablePois) => {
    deletePoi(id)
    .then(data => updateEditablePois(data));
}

let mapStateToProps = (state) =>
    ({
        editablePois: state.editablePois,
        poiBeingEdited: state.poiBeingEdited,
    })

let mapDispatchToProps = (dispatch) =>
    ({ 
        updateEditablePois: (payload) => dispatch(updateEditablePois(payload)),
        updatePoiBeingEdited: (payload) => dispatch(updatePoiBeingEdited(payload)),
    })

let EditablePois = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditablePoisDumb);

export default EditablePois;