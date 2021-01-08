

import { LOAD_USER }  from '../Actions/actions';
const intialState = JSON.parse(localStorage.getItem('user')) || {};

const activeUser = (state = intialState , action) => {
    switch(action.type) {
        case LOAD_USER: {
            let newState = action.payload
            localStorage.setItem('user' , JSON.stringify(newState))
            return newState;
        } 
        default: {
            return state;
        }
    }
}
export default activeUser;