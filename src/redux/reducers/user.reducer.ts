import {GET_USER_PROFILE_SUCCESS} from "../actions/user.actions";
import {AnyAction} from "redux";

const initialState: UserState = {
    id: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    role: undefined,
}

export default function userReducer(
    state = initialState,
    action: AnyAction
) {
    switch (action.type) {
        case GET_USER_PROFILE_SUCCESS:
            return {
                ...action.user
            }

    }
    return state;
}
