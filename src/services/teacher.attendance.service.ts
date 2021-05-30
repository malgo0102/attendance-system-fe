import axios from "axios";
import {Attendance} from "../type";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const ATTENDANCE_URL = serverUrl + '/api/attendance'

export const startAttendance = (token: string, attendance: Attendance): Promise<Attendance> => {
    const config = {
        headers: {Authorization: `Bearer ${token}`},
    };
    return axios
        .post(ATTENDANCE_URL, attendance, config)
        .then((response) => response.data)
        .catch((error) => {
            throw error.response;
        });
}


export const getAttendanceEvent = (token: string, attendanceId: string): Promise<Attendance> => {
    const config = {
        headers: {Authorization: `Bearer ${token}`},
    };
    return axios
        .get(`${ATTENDANCE_URL}/${attendanceId}`, config)
        .then((response) => response.data)
        .catch((error) => {
            throw error.response;
        });
}

export const updateAttendanceEventClosed = (token: string, attendanceId: string, isClosed: boolean): Promise<Attendance> => {
    const config = {
        headers: {Authorization: `Bearer ${token}`},
    };
    return axios
        .put(`${ATTENDANCE_URL}/${attendanceId}`, {isClosed}, config)
        .then((response) => response.data)
        .catch((error) => {
            throw error.response;
        });
}
