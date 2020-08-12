import * as actionTypes from './actionTypes';
import axios from 'axios';
import cognitoUtils from '../../utilities/cognitoUtils';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = () => {
    return {
        type: actionTypes.AUTH_SUCCESS
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const getUser = (user) => {
    return {
        type: actionTypes.GET_USER,
        name: user
    }    
};

export const debtorDetails = (data, history) => {
    history.push('/create-order/vehicle-details');
    return {
        type: actionTypes.DEBTOR_DETAILS,
        orderData: data
    };
};

export const vehicleDetails = (data, history) => {
    history.push('/create-order/order-details');
    return {
        type: actionTypes.VEHICLE_DETAILS,
        orderData: data
    };
};

export const orderDetails = (data, history) => {
    history.push('/create-order/order-summary');
    return {
        type: actionTypes.ORDER_DETAILS,
        orderData: data
    };
};

export const orderEdit = (data) => {
    return {
        type: actionTypes.ORDER_EDIT,
        orderData: data
    };
};

export const cancelSubmit = (history) => {
    history.push('/dashboard');
    return dispatch => {
        dispatch(deleteOrderStore());
    }
};

export const deleteOrderStore = () => {
    return {
        type: actionTypes.DELETE_ORDER_STORE
    };
};

export const deleteClient = (clientId, history) => {
    return dispatch => {
        const URL = 'https://superiorrecoveryllc.com/client/' + clientId;
        axios.delete(URL, { withCredentials: true })
        .then(response => {
            // dispatch(deleteClientStore());
            history.push('/dashboard/clients');
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    };
};

export const getOrder = (orderId, history) => {
    return dispatch => {
        axios.get(`https://api.superiorrecoveryllc.com/dashboard/order/${orderId}`, { withCredentials: true })
            .then(response => {
                const orderData = response.data.order;
                dispatch(orderEdit(orderData));
                history.push(`/edit-order`);
            })
            .catch(err => {
                console.log(err);
                window.location.reload(true);
            })
    };
};

export const addOrder = (data, history) => {
    return dispatch => {
        const payload = data;
        axios.post('https://api.superiorrecoveryllc.com/dashboard/order', payload, { withCredentials: true })
        .then(response => {
            dispatch(deleteOrderStore());
            history.push('/dashboard');
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    };
};

export const updateOrder = (data, history) => {
    return dispatch => {
        const payload = data;
        const orderId = data.orderId;
        axios.put(`https://api.superiorrecoveryllc.com/dashboard/order/${orderId}`, payload, { withCredentials: true })
        .then(response => {
            dispatch(deleteOrderStore());
            history.push('/dashboard');
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    };
};

export const clearCookie = (history) => {
    return dispatch => {
        axios.get(`https://api.superiorrecoveryllc.com/logout`, { withCredentials: true })
        .then(response => {
            dispatch(clearSession());
            history.push('/dashboard');
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    };
};

export const clearSession = () => ({
    type: actionTypes.CLEAR_SESSION
  })
  
  // Initialise the Cognito sesson from a callback href
export function initSessionFromCallbackURI (callbackHref, history) {
    return function (dispatch) {
        return cognitoUtils.parseCognitoWebResponse(callbackHref) // parse the callback URL
        .then(() => cognitoUtils.getCognitoSession()) // get a new session
        .then((session, history) => {
            return session;
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        let cookie = document.cookie.includes('session');
        if (cookie) {
            dispatch(authSuccess());
        }
        else {
            console.log('clear session');
            dispatch(clearSession());
        }
    };
};