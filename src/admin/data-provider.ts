import simpleRestProvider from "ra-data-simple-rest";
import {fetchUtils} from "react-admin";


export const dataProvider = (token?: string) => {
    const httpClient = (url: string, options: any = {}) => {
        if (!options.headers) {
            options.headers = new Headers({Accept: 'application/json'});
        }
        options.headers.set('Authorization', `Bearer ${token}`);
        return fetchUtils.fetchJson(url, options);
    };
    return simpleRestProvider(process.env.REACT_APP_SERVER_URL + "/api", httpClient)
}
