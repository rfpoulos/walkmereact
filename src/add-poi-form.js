import React from 'react';
import { connect } from 'react-redux';
import { 
        addEditablePoi, 
        updateEditableWalks,
        updateWalkBeingEdited,
     } from './reducer-handlers';
import EditablePois from './editable-pois';
import PoiSearchBox from './poi-search-box';
import { makePublicOrPrivate } from './your-walks';

let AddPoiFormDumb = ({ walkBeingEdited, 
                        addEditablePoi, 
                        editablePois, 
                        updateEditableWalks,
                        updateWalkBeingEdited,
                        history
                     }) =>
    <div className="poi-form">
        <h2 className="self-center"><strong>Step 3:</strong> Add POIs!</h2>
        <EditablePois />
        <PoiSearchBox 
            walkBeingEdited={walkBeingEdited}
            addEditablePoi={addEditablePoi}
            editablePois={editablePois}
             />
        {
            makePublicOrPrivate(updateWalkBeingEdited, walkBeingEdited, updateEditableWalks, history)
        }
    </div>

let mapStateToProps = (state, { history }) =>
    ({
        walkBeingEdited: state.walkBeingEdited,
        editablePois: state.editablePois,
        history
    })

let mapDispatchToProps = (dispatch) =>
    ({ 
        addEditablePoi: (poi) => dispatch(addEditablePoi(poi)),
        updateEditableWalks: (pois) => dispatch(updateEditableWalks(pois)),
        updateWalkBeingEdited: (poi) => dispatch(updateWalkBeingEdited(poi)),
    })

let AddPoiForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPoiFormDumb);

export default AddPoiForm;