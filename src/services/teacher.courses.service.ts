import axios from "axios";
import {Course} from "../type";


const serverUrl = process.env.REACT_APP_SERVER_URL;

const COURSES_URL = serverUrl + '/api/courses'

export const getTeacherCourses = (token: string, teacherId: string): Promise<Array<Course>> => {
    const config = {
        headers: {Authorization: `Bearer ${token}`},
        params: {
            filter: `["teacher_id","${teacherId}"]`
        }
    };
    return axios
        .get(COURSES_URL, config)
        .then((response) => response.data)
        .catch((error) => {
            throw error.response;
        });
}
