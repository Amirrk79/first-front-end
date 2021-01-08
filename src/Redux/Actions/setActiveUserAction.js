import { LOAD_USER } from './actions';

const setActiveUser = (data) => {
    return {
        type: LOAD_USER , 
        payload: data
    }
}
export default setActiveUser;