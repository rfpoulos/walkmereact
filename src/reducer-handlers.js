import React from 'react';
import ReactDOM from 'react-dom';

export const initialState = {
    userObject: '',
    menuViewable: false
}

const UPDATE_INITIAL_STATE = "UPDATE_INITIAL_STATE";
export let updateInitialState = (payload) => ({type: UPDATE_INITIAL_STATE, payload});
let updateInitialStateAction = (state, action) => {
    let userObject = Object.assign({}, action.payload);
    return ({ ...state, userObject });
}
updateInitialState.toString = () => UPDATE_INITIAL_STATE;

const UPDATE_MENU_VIEWABLE = "UPDATE_MENU_VIEWABLE";
export let updateMenuViewable = (payload) => ({type: UPDATE_MENU_VIEWABLE, payload});
let updateMenuViewableAction = (state, action) => {
    return ({ ...state, menuViewable: !state.menuViewable });
}
updateMenuViewable.toString = () => UPDATE_MENU_VIEWABLE;

let reducerHandlers = {
    [updateInitialState]: updateInitialStateAction,
    [updateMenuViewable]: updateMenuViewableAction
};

export default reducerHandlers;