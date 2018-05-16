export const initialState = {
    userObject: '',
    menuViewable: false,
    walkBeingEdited: '',
    editablePois: [],
    poiBeingEdited: '',
    profileBeingViewed: '',
    editableWalks: [],
    currentLocation: '',
}

const UPDATE_USER_OBJECT = "UPDATE_USER_OBJECT";
export let updateUserObject = (payload) => ({type: UPDATE_USER_OBJECT, payload});
let updateUserObjectAction = (state, action) => {
    return ({ ...state, userObject: action.payload });
}
updateUserObject.toString = () => UPDATE_USER_OBJECT;

const UPDATE_PROFILE_BEING_VIEWED = "UPDATE_PROFILE_BEING_VIEWED";
export let updateProfileBeingViewed = (payload) => ({type: UPDATE_PROFILE_BEING_VIEWED, payload});
let updateProfileBeingViewedAction = (state, action) => {
    return ({ ...state, profileBeingViewed: action.payload });
}
updateProfileBeingViewed.toString = () => UPDATE_PROFILE_BEING_VIEWED;

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

const UPDATE_EDITABLE_POIS = "UPDATE_EDITABLE_POIS";
export let updateEditablePois = (payload) => ({type: UPDATE_EDITABLE_POIS, payload});
let updateEditablePoisAction = (state, action) => {
    return ({ ...state, editablePois: action.payload });
}
updateEditablePois.toString = () => UPDATE_EDITABLE_POIS;

const RESET_EDITABLE_POIS = "RESET_EDITABLE_POIS";
export let resetEditablePois = () => ({type: RESET_EDITABLE_POIS});
let resetEditablePoisAction = (state, action) => {
    return ({ ...state, editablePois: [] });
}
resetEditablePois.toString = () => RESET_EDITABLE_POIS;

const UPDATE_POI_BEING_EDITIED = "UPDATE_POI_BEING_EDITIED";
export let updatePoiBeingEdited = (payload) => ({type: UPDATE_POI_BEING_EDITIED, payload});
let updatePoiBeingEditedAction = (state, action) => {
    return ({ ...state, poiBeingEdited: Object.assign({}, action.payload) });
}
updatePoiBeingEdited.toString = () => UPDATE_POI_BEING_EDITIED;

const UPDATE_EDITABLE_WALKS = "UPDATE_EDITABLE_WALKS";
export let updateEditableWalks = (payload) => ({type: UPDATE_EDITABLE_WALKS, payload});
let updateEditableWalksAction = (state, action) => {
    return ({ ...state, editableWalks: action.payload });
}
updateEditableWalks.toString = () => UPDATE_EDITABLE_WALKS;

const UPDATE_CURRENT_LOCATION = "UPDATE_CURRENT_LOCATION";
export let updateCurrentLocation = (payload) => ({type: UPDATE_CURRENT_LOCATION, payload});
let updateCurrentLocationAction = (state, action) => {
    return ({ ...state, currentLocation: action.payload });
}
updateCurrentLocation.toString = () => UPDATE_CURRENT_LOCATION;

let reducerHandlers = {
    [updateUserObject]: updateUserObjectAction,
    [updateMenuViewable]: updateMenuViewableAction,
    [updateWalkBeingEdited]: updateWalkBeingEditedAction,
    [addEditablePoi]: addEditablePoiAction,
    [revertInitialState]: revertInitialStateAction,
    [resetEditablePois]: resetEditablePoisAction,
    [updateEditablePois]: updateEditablePoisAction,
    [updatePoiBeingEdited]: updatePoiBeingEditedAction,
    [updateProfileBeingViewed]: updateProfileBeingViewedAction,
    [updateEditableWalks]: updateEditableWalksAction,
    [updateCurrentLocation]: updateCurrentLocationAction,
};

export default reducerHandlers;