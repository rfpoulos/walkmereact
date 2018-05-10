import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import dottedLine from './images/Dotted-line.png';
import uparrow from './images/angle-double-up.svg';
import downarrow from './images/angle-double-down.svg';

let EditablePoisDumb = ({ editablePois, beingEditedPoi }) =>
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
                            <h6 className="low-margin">{`{${poi.lat}, ${poi.long}}`}</h6>
                        </div>
                    </div>
                    <div className="arrows">
                        <img className="arrow" src={uparrow} alt="Up Arrow" />
                        <img className="arrow" src={downarrow} alt="Down Arrow" />
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

let mapStateToProps = (state) =>
    ({
        editablePois: state.editablePois,
        beingEditedPoi: state.beingEditedPoi,
    })

let mapDispatchToProps = (dispatch) =>
    ({ 
    })

let EditablePois = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditablePoisDumb);

export default EditablePois;