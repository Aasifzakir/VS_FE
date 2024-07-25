import types from "./AuthActionTypes";

const initialState = {
    user: null,
    userLoading: false,
    userResponse: null,

    loginLoading: false,
    loginResponse: null,

    postUserLoading: false,
    postUseresponse: null,

    unauthorized: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        //POST USER
        case types.POST_USER_REQUEST:
            return {
                ...state,
                postUserLoading: true,
            };
        case types.POST_USER_RESPONSE:
            return {
                ...state,
                postUserLoading: false,
                postUserResponse: action.payload,
            };

        case types.POST_USER_RES_CLEAR:
            return {
                ...state,
                postUserLoading: false,
                postUserResponse: null,
            };

        //LOGIN
        case types.LOGIN_REQUEST:
            return {
                ...state,
                loginLoading: true,
            };
        case types.LOGIN_RESPONSE:
            return {
                ...state,
                loginLoading: false,
                loginResponse: action.payload,
            };

        case types.LOGIN_RES_CLEAR:
            return {
                ...state,
                loginLoading: false,
                loginResponse: null,
            };

        //ACTIVE USER

        case types.ACTIVE_USER_REQUEST:
            return {
                ...state,
                userLoading: true,
            };

        case types.ACTIVE_USER_RESPONSE:
            return {
                ...state,
                userLoading: false,
                userResponse: action.payload,
                user: action.payload?.data,
            };

        case types.CLEAR_ACTIVE_USER:
            return {
                ...state,
                user: null,
            };

        case types.ERROR_RESPONSE:
            return {
                ...state,
                unauthorized: action.payload
            }

        case types.CLEAR_ERROR_RESPONSE:
            return {
                ...initialState,
                user: state.user
            }

        default:
            return state;
    }
};

export default authReducer;