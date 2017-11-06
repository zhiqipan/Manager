import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
} from './types';

export const employeeUpdate = ({prop, value}) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: {prop, value},
    };
};

export const employeeCreate = ({name, phone, shift}) => {
    console.log('creating an employee', name, phone, shift);
    const {currentUser} = firebase.auth();

    return dispatch => {
        firebase.database().ref(`users/${currentUser.uid}/employees`)
            .push({name, phone, shift})
            .then(() => Actions.employeeList({type: 'reset'}))
            .then(dispatch({type: EMPLOYEE_CREATE}));
    };
};