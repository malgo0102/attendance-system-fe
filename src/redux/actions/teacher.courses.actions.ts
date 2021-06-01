import {AnyAction} from "redux";
import {Course} from "../../type";

export const GET_OWN_COURSES = "[Teacher] GET_OWN_COURSES"
export const GET_OWN_COURSES_SUCCESS = "[Teacher] GET_OWN_COURSES_SUCCESS"
export const GET_OWN_COURSES_ERROR = "[Teacher] GET_OWN_COURSES_ERROR"

export function getOwnCourses(token: string, teacherId: string) {
    const action: AnyAction = {
        type: GET_OWN_COURSES,
        token,
        teacherId
    }
    return action
}


export function setOwnCourses(courses: Course[]) {
    const action: AnyAction = {
        type: GET_OWN_COURSES_SUCCESS,
        courses
    }
    return action
}
