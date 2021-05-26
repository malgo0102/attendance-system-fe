import {AnyAction} from "redux";

export const GET_USER_PROFILE = "GET_USER_PROFILE"
export const GET_USER_PROFILE_SUCCESS = "GET_USER_PROFILE_SUCCESS"
export const GET_USER_PROFILE_ERROR = "GET_USER_PROFILE_ERROR"

export function getUser(token: string) {
    const action: AnyAction = {
        type: GET_USER_PROFILE,
        token
    }
    return action
}

export function setUser(user: UserState) {
    const action: AnyAction = {
        type: GET_USER_PROFILE_SUCCESS,
        user,
    }
    return action
}
