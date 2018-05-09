import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AddWalkForm from './add-walk-form'

let AddWalkDumb = ({ walkBeingEdited }) =>
    <div>
        { whatToDisplay(walkBeingEdited) }
    </div>

let whatToDisplay = (walkBeingEdited) => {
    if (walkBeingEdited) {
        return(
            <div>
                <img src={walkBeingEdited.thumbnail} />
                <h1>{walkBeingEdited.title}</h1>
                <h4>Guide {walkBeingEdited.userid}</h4>
                <p>{walkBeingEdited.description}</p>
            </div>
        )
    } else {
        return <AddWalkForm />
    }
}

let mapStateToProps = (state) =>
    ({
        walkBeingEdited: state.walkBeingEdited
    })

let mapDispatchToProps = (dispatch) =>
    ({ 
    })

let AddWalk = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddWalkDumb);

export default AddWalk;