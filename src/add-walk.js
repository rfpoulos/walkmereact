import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
        postInitialWalk,
    } from './fetch-data'
import { updateWalkBeingEdited, resetEditablePois} from './reducer-handlers';

let AddWalkDumb = ({ updateWalkBeingEdited, resetEditablePois, history }) =>
    <div className="add-walk-container">
        <form className="add-walk" onSubmit={(event) => submitWalk(event, updateWalkBeingEdited, history, resetEditablePois)}>
            <h2 className="self-center"><strong>Step 1:</strong> Add Your Walk!</h2>
            <input type="text" name="title" placeholder="Title (required)" />
            <textarea name="description" placeholder="description" />
            <button className="self-center" type="submit">Start a Walk!</button>
        </form>
    </div>

let submitWalk = async (event, updateWalkBeingEdited, history, resetEditablePois) => {
    event.preventDefault();
    let initialWalkObject = {
        title: event.target.title.value,
        description: event.target.title.value
    }
    let walkData = await postInitialWalk(initialWalkObject);
    let walk = walkData[0];
    updateWalkBeingEdited(walk);
    resetEditablePois();
    history.push('/editwalk/' + walk.id);
}

let mapStateToProps = (state, { history }) =>
    ({
        history,
    })

let mapDispatchToProps = (dispatch) =>
    ({ 
        updateWalkBeingEdited: (walk) => dispatch(updateWalkBeingEdited(walk)),
        resetEditablePois: () => dispatch(resetEditablePois()),
    })

let AddWalk = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddWalkDumb);

export default withRouter(AddWalk);