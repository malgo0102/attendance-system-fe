import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {createHashHistory} from 'history';
import "./index.css";
import App from "./App";

import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import {Provider} from "react-redux";
import createAppStore from "./redux/reducers";
import {dataProvider} from "./admin/data-provider";

export const history = createHashHistory();


const store = createAppStore({
    dataProvider: dataProvider(),
    history,
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Auth0ProviderWithHistory>
                <App/>
            </Auth0ProviderWithHistory>
        </Provider>
    </BrowserRouter>
    ,
    document.getElementById("root")
);
