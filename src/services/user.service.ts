import axios from "axios";


const serverUrl = process.env.REACT_APP_SERVER_URL;

const PROFILE_URL = serverUrl + '/api/users/me'

export const getUserProfile = (token: string): Promise<User> => {
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };
    return axios
        .get(PROFILE_URL, config)
        .then((response) => response.data)
        .catch((error) => {
            throw error.response;
        });
}
