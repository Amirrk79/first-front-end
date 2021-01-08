import { ADD_USER } from './actions';

const addUser = (userData) => {
    return {
        type:ADD_USER ,
        payload:userData
    }
};
export default addUser;