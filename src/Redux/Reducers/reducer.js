
import { ADD_USER , EDIT_USER , REMOVE_USER } from '../Actions/actions';

const intialState = JSON.parse(localStorage.getItem('users')) || [];

const reducer = (state = intialState , action) => {
    switch(action.type) {
        case ADD_USER: {
            let newState = [...state , action.payload];
            localStorage.setItem('users' , JSON.stringify(newState))
            return newState; 
        }
        case EDIT_USER: {
            let newState = [...state];
            let userIndex = newState.findIndex(users => users.email === action.payload.email);
            newState[userIndex] = action.payload
            localStorage.setItem('users' , JSON.stringify(newState))
            return newState;
        }
        default: 
        return state;
    }
};

export default reducer;