import React from 'react';
import { connect } from 'react-redux';
import WalkCard from './walk-card';
import { 
        updateWalkBeingEdited,
        updateEditableWalks,
    } from './reducer-handlers';
import { deleteWalk } from './fetch-data';

let YourWalksDumb = ({ editableWalks, updateWalkBeingEdited, history, updateEditableWalks }) =>
    <div className="walk-cards">
        {
            editableWalks.map(walk =>
                <div key={walk.id}> 
                    <WalkCard walk={walk}/>
                    <div className="walk-buttons">
                        <button onClick={() => editWalk(updateWalkBeingEdited, history, walk)}>Edit</button>
                        <button onClick={() => removeWalk(updateEditableWalks, walk.id)}>Delete</button>
                        <button>Make Public</button>
                    </div>
                </div>)
        }
    </div>

let editWalk = (updateWalkBeingEdited, history, walk) => {
    updateWalkBeingEdited(walk);
    history.push('/editwalk/' + walk.id)
}

let removeWalk = async (updateEditableWalks, walkId) => {
    let result = await deleteWalk(walkId);
    updateEditableWalks(result);
}

let mapStateToProps = (state, { history }) =>
    ({
        editableWalks: state.editableWalks,
        history,
    })

let mapDispatchToProps = (dispatch) =>
    ({ 
        updateWalkBeingEdited: (payload) => dispatch(updateWalkBeingEdited(payload)),
        updateEditableWalks: (payload) => dispatch(updateEditableWalks(payload)),
    })

let YourWalks = connect(
    mapStateToProps,
    mapDispatchToProps
)(YourWalksDumb);

export default YourWalks;