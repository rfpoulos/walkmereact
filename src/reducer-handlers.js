export const initialState = {
    userObject: '',
    menuViewable: false,
    walkBeingEdited: '',
    editablePois: [],
    beingEditedPoi: {},
}

const UPDATE_INITIAL_STATE = "UPDATE_INITIAL_STATE";
export let updateInitialState = (payload) => ({type: UPDATE_INITIAL_STATE, payload});
let updateInitialStateAction = (state, action) => {
    return ({ ...state, userObject: action.payload });
}
updateInitialState.toString = () => UPDATE_INITIAL_STATE;

const REVERT_INITIAL_STATE = "REVERT_INITAL_STATE";
export let revertInitialState = () => ({type: REVERT_INITIAL_STATE});
let revertInitialStateAction = (state, action) => ({...state, ...initialState});
revertInitialState.toString = () => REVERT_INITIAL_STATE;

const UPDATE_MENU_VIEWABLE = "UPDATE_MENU_VIEWABLE";
export let updateMenuViewable = () => ({type: UPDATE_MENU_VIEWABLE});
let updateMenuViewableAction = (state, action) => {
    return ({ ...state, menuViewable: !state.menuViewable });
}
updateMenuViewable.toString = () => UPDATE_MENU_VIEWABLE;

const UPDATE_WALK_BEING_EDITIED = "UPDATE_WALK_BEING_EDITIED";
export let updateWalkBeingEdited = (payload) => ({type: UPDATE_WALK_BEING_EDITIED, payload});
let updateWalkBeingEditedAction = (state, action) => {
    return ({ ...state, walkBeingEdited: Object.assign({}, action.payload) });
}
updateWalkBeingEdited.toString = () => UPDATE_WALK_BEING_EDITIED;

const ADD_EDITABLE_POI = "ADD_EDITABLE_POI";
export let addEditablePoi = (payload) => ({type: ADD_EDITABLE_POI, payload});
let addEditablePoiAction = (state, action) => {
    let editablePois = state.editablePois.concat([action.payload])
    return ({ ...state, editablePois });
}
addEditablePoi.toString = () => ADD_EDITABLE_POI;

const RESET_EDITABLE_POIS = "RESET_EDITABLE_POIS";
export let resetEditablePois = () => ({type: RESET_EDITABLE_POIS});
let resetEditablePoisAction = (state, action) => {
    return ({ ...state, editablePois: [] });
}
resetEditablePois.toString = () => RESET_EDITABLE_POIS;

let reducerHandlers = {
    [updateInitialState]: updateInitialStateAction,
    [updateMenuViewable]: updateMenuViewableAction,
    [updateWalkBeingEdited]: updateWalkBeingEditedAction,
    [addEditablePoi]: addEditablePoiAction,
    [revertInitialState]: revertInitialStateAction,
    [resetEditablePois]: resetEditablePoisAction,
};

export default reducerHandlers;