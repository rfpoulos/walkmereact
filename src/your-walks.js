import React from 'react';
import { connect } from 'react-redux';
import WalkCard from './walk-card';
import { 
        updateWalkBeingEdited,
        updateEditableWalks,
    } from './reducer-handlers';
import { deleteWalk, updatePublicStatus } from './fetch-data';

let YourWalksDumb = ({ editableWalks, updateWalkBeingEdited, history, updateEditableWalks }) =>
    <div>
        <h2 className="center-text">Your Walks</h2>
        <div className="walk-cards">
            {
                editableWalks.map(walk =>
                    <div key={walk.id}> 
                        <WalkCard walk={walk}/>
                        <div className="walk-buttons">
                            <button onClick={() => editWalk(updateWalkBeingEdited, history, walk)}>Edit</button>
                            <button onClick={() => removeWalk(updateEditableWalks, walk.id)}>Delete</button>
                            {
                                makePublicOrPrivate(updateWalkBeingEdited, walk, updateEditableWalks, history)
                            }
                        </div>
                    </div>)
            }
        </div>
    </div>

export let makePublicOrPrivate = (updateWalkBeingEdited, walk, updateEditableWalks, history) => {
    if (walk.public) {
        return <button onClick={() => changePublicStatus(updateWalkBeingEdited, updateEditableWalks, walk.id)}
                >Make Private</button>
    } else {
        return <button onClick={() => {
            changePublicStatus(updateWalkBeingEdited, updateEditableWalks, walk.id);
            history.push('/yourwalks')
        }}
                >Make Public</button>
    }
}

let changePublicStatus = async (updateWalkBeingEdited, updateEditableWalks, walkId) => {
    let results = await updatePublicStatus(walkId);
    updateEditableWalks(results);
    updateWalkBeingEdited(results.find(element => element.id === walkId));
}

let editWalk = (updateWalkBeingEdited, history, walk) => {
    updateWalkBeingEdited(walk);
    history.push('/editwalk/' + walk.id)
}

let removeWalk = async (updateWalkBeingEdited, updateEditableWalks, walkId) => {
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