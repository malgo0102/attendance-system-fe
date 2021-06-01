import {AnyAction} from "redux";
import {takeLatest, put, call} from "redux-saga/effects";
import {GET_USER_PROFILE, GET_USER_PROFILE_ERROR, setUser} from "../actions/user.actions";
import {getUserProfile} from "../../services/user.service";
import {UserState} from "../../type";

export function* doRequestProfile(action: AnyAction) {
    try {
        const {token} = action
        const payload: UserState = yield call(getUserProfile, token);
        yield put(setUser(payload));
    } catch (error) {
        yield put({
            type: GET_USER_PROFILE_ERROR,
            payload: {
                message: error.data.message,
                statusCode: error.status,
            },
        });
    }
}

export function* watchRequestProfile() {
    yield takeLatest(GET_USER_PROFILE, doRequestProfile);
}
