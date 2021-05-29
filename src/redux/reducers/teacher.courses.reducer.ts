import {GET_OWN_COURSES_SUCCESS} from "../actions/teacher.courses.actions";
import {AnyAction} from "redux";
import {CoursesState} from "../../type";

const initialState: CoursesState = {
    courses: [],
}

export default function teacherCoursesReducer(
    state = initialState,
    action: AnyAction
) {
    switch (action.type) {
        case GET_OWN_COURSES_SUCCESS:
            return {
                courses: action.courses,
            }
    }
    return state;
}
