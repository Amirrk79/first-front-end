
import { combineReducers } from 'redux';
import reducer from './reducer';
import activeUser from './activeUserReducer';

const allReducers = combineReducers({
    users : reducer ,
    user : activeUser
});
export default allReducers;