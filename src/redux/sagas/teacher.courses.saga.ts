import {AnyAction} from "redux";
import {takeLatest, put, call} from "redux-saga/effects";
import {getTeacherCourses} from "../../services/teacher.courses.service";
import {Course} from "../../type";
import {GET_OWN_COURSES, GET_OWN_COURSES_ERROR, setOwnCourses} from "../actions/teacher.courses.actions";

export function* doRequestTeacherCourses(action: AnyAction) {
    try {
        const {token, teacherId} = action
        const payload: Course[] = yield call(getTeacherCourses, token, teacherId);
        yield put(setOwnCourses(payload));
    } catch (error) {
        yield put({
            type: GET_OWN_COURSES_ERROR,
            payload: {
                message: error.data.message,
                statusCode: error.status,
            },
        });
    }
}

export function* watchRequestTeacherCourses() {
    yield takeLatest(GET_OWN_COURSES, doRequestTeacherCourses);
}
