import reducerHandlers from './reducer-handlers';
import { initialState } from './reducer-handlers';

let fallback = (state, action) => state;

let reducer = (oldState = initialState, action) => {
    let babyReducer = reducerHandlers[action.type] || fallback;
    return babyReducer(oldState, action);
};

export default reducer;

