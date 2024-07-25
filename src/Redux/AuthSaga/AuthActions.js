import types from './AuthActionTypes'

export const postUserRequest = (payload) => ({
    type: types.POST_USER_REQUEST,
    payload
})

export const postUserResponse = (payload) => ({
    type: types.POST_USER_RESPONSE,
    payload
})

export const postUserResClear = () => ({
    type: types.POST_USER_RES_CLEAR
})

export const loginRequest = (payload) => ({
    type: types.LOGIN_REQUEST,
    payload
})

export const loginResponse = (payload) => ({
    type: types.LOGIN_RESPONSE,
    payload
})

export const loginResClear = (payload) => ({
    type: types.LOGIN_RES_CLEAR,
    payload
})

export const activeUserRequest = (payload) => ({
    type: types.ACTIVE_USER_REQUEST,
    payload
})

export const activeUserResponse = (payload) => ({
    type: types.ACTIVE_USER_RESPONSE,
    payload
})

export const clearActiveUser = (payload) => ({
    type: types.CLEAR_ACTIVE_USER,
    payload
})

export const errorResponse = (payload) => ({
    type: types.ERROR_RESPONSE,
    payload
})

export const clearErrorResponse = () => ({
    type: types.CLEAR_ERROR_RESPONSE,
})