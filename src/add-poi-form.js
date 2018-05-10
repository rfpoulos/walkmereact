import React from 'react';
import { connect } from 'react-redux';
import { addEditablePoi } from './reducer-handlers';
import EditablePois from './editable-pois';
import PoiSearchBox from './poi-search-box';

let AddPoiFormDumb = ({ walkBeingEdited, addEditablePoi, editablePois }) =>
    <div className="poi-form">
        <h2 className="self-center"><strong>Step 3:</strong> Add POIs!</h2>
        <EditablePois />
        <PoiSearchBox 
            walkBeingEdited={walkBeingEdited}
            addEditablePoi={addEditablePoi}
            editablePois={editablePois}
             />
    </div>

let mapStateToProps = (state) =>
    ({
        walkBeingEdited: state.walkBeingEdited,
        editablePois: state.editablePois,
    })

let mapDispatchToProps = (dispatch) =>
    ({ 
        addEditablePoi: (poi) => dispatch(addEditablePoi(poi)),
    })

let AddPoiForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPoiFormDumb);

export default AddPoiForm;