import React from 'react';
import ReactDOM from 'react-dom';

export const initialState = {
    userObject: {}
}

const UPDATE_INITIAL_STATE = "UPDATE_INITIAL_STATE";
export let updateInitialState = (payload) => ({type: UPDATE_INITIAL_STATE, payload});
let updateInitialStateAction = (state, action) => {
    let userObject = Object.assign({}, action.payload);
    return ({ ...state, userObject });
}
updateInitialState.toString = () => UPDATE_INITIAL_STATE;

let reducerHandlers = {
    [updateInitialState]: updateInitialStateAction
};

export default reducerHandlers;