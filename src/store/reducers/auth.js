import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    isAuthenticated: false,
    error: '',
    loading: false,
    orderEditData: {
        orderId: '',
        debtorDetails: {
            debtorStateProvince: '',
            employerStateProvince: ''
        },
        vehicleDetails: {},
        orderDetails: {
            transportStateProvince: ''
        }
    },
    editing: false
};

const authStart = ( state, action ) => {
    return updateObject(state, { error: null, loading: true });
}

const authSuccess = ( state, action ) => {
    return updateObject(state, { 
        isAuthenticated: true,
        error: null,
        loading: false
    });
}

const authFail = ( state, action ) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
}

const debtorDetails = ( state, action ) => {
    return updateObject( state, {
        orderEditData: {
            ...state.orderEditData,
            debtorDetails: action.orderData
        },
        loading: false
    });
}

const vehicleDetails = ( state, action ) => {
    return updateObject( state, {
        orderEditData: {
            ...state.orderEditData,
            vehicleDetails: action.orderData
        },
        loading: false
    });
}

const orderDetails = ( state, action ) => {
    return updateObject( state, {
        orderEditData: {
            ...state.orderEditData,
            orderDetails: action.orderData
        },
        loading: false
    });
}

const orderEdit = ( state, action ) => {
    return updateObject( state, {
        orderEditData: {
            ...state.orderEditData,
            orderId: action.orderData._id,
            debtorDetails: action.orderData.debtorDetails,
            vehicleDetails: action.orderData.vehicleDetails,
            orderDetails: action.orderData.orderDetails
        },
        editing: true,
        loading: false
    });
}

const deleteOrderStore = ( state, action ) => {
    return updateObject( state, {
        orderEditData: {
            orderId: '',
            debtorDetails: {},
            vehicleDetails: {},
            orderDetails: {}
        },
        editing: false,
        loading: false
    });
}

const setSession = ( state, action ) => {
    return Object.assign({},
        action.session,
        {
            isAuthenticated: true,
            loading: false,
            error: '',
            orderEditData: null
        }
    )
}

const clearSession = ( state, action ) => {
    return initialState
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.SET_SESSION: return setSession(state, action);
        case actionTypes.CLEAR_SESSION: return clearSession(state, action);
        case actionTypes.DEBTOR_DETAILS: return debtorDetails(state, action);
        case actionTypes.VEHICLE_DETAILS: return vehicleDetails(state, action);
        case actionTypes.ORDER_DETAILS: return orderDetails(state, action);
        case actionTypes.ORDER_EDIT: return orderEdit(state, action);
        case actionTypes.DELETE_ORDER_STORE: return deleteOrderStore(state, action);
        default:
            return state;
            
    }
};

export default authReducer;