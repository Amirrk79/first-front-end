import { EDIT_USER } from './actions';

const EditUser = (data) => {
    return {
        type: EDIT_USER ,
        payload: data
    }
};

export default EditUser;