import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import dottedLine from './images/Dotted-line.png';
import uparrow from './images/angle-double-up.svg';
import downarrow from './images/angle-double-down.svg';
import { updateEditablePois } from './reducer-handlers';

let EditablePoisDumb = ({ editablePois, beingEditedPoi, updateEditablePois }) =>
    <div>
    {
        editablePois.map(poi =>
            <div key={poi.position}>
                <div className="poi-div">
                    <div className="editable-poi">
                        <div className="poi-thumbnail">
                            <img className="thumbnail" src={'http://localhost:5000/' + poi.thumbnail} alt="POI Thumbnail" />
                        </div>
                        <div>
                            <h2 className="low-margin">{poi.title}</h2>
                            <h6 className="low-margin">{poi.address.split(",", 1)}</h6>
                            <h6 className="low-margin">{poi.address.split(",").splice(1)}</h6>
                            <h6 className="low-margin">{`{${parseFloat(poi.lat).toPrecision(10)}, ${parseFloat(poi.long).toPrecision(10)}}`}</h6>
                        </div>
                    </div>
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
                    <Link to={`/editpoi/${poi.id}`}>Edit this POI</Link>
                    <img className="dotted-line" src={dottedLine} alt="" />
                </div>
            </div>
        )
    }
    </div>

let shouldUpArrowDisplay = (poi, editablePois, updateEditablePois) => {
    if (poi.position !== 0) {
        return <img className="arrow" src={uparrow} alt="Up Arrow"
            onClick={() => moveUp(poi, editablePois, updateEditablePois)} />
    }
}

let shouldDownArrowDisplay = (poi, editablePois, updateEditablePois) => {
    if (poi.position !== editablePois.length - 1) {
        return <img className="arrow" src={downarrow} alt="Down Arrow"
        onClick={() => moveDown(poi, editablePois, updateEditablePois)} />
    }
}

let moveUp = (poi, editablePois, updateEditablePois) => {
    let firstArray = editablePois.map(element => {
        if(element.position === poi.position - 1) {
            element.position += 1;
        }
        return element
        });
    let secondArray = firstArray.map(element => {
        if(element.id === poi.id) {
            element.position -= 1;
        }
        return element;
        });
    let newEditablePois = [];
    secondArray.map(element => 
        newEditablePois[element.position] = element);
    updateEditablePois(newEditablePois);
}

let moveDown = (poi, editablePois, updateEditablePois) => {
    let firstArray = editablePois.map(element => {
        if(element.position === poi.position + 1) {
            element.position -= 1;
        }
        return element;
        });
    let secondArray = firstArray.map(element => {
        if(element.id === poi.id) {
            element.position += 1;
        }
        return element;
        });
    let newEditablePois = [];
    secondArray.map(element => 
        newEditablePois[element.position] = element);
    updateEditablePois(newEditablePois);
}

let mapStateToProps = (state) =>
    ({
        editablePois: state.editablePois,
        beingEditedPoi: state.beingEditedPoi,
    })

let mapDispatchToProps = (dispatch) =>
    ({ 
        updateEditablePois: (payload) => dispatch(updateEditablePois(payload)),
    })

let EditablePois = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditablePoisDumb);

export default EditablePois;