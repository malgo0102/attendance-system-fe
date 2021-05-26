import React, {useEffect, useState} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Layout from "./containers/Layout";
import FrontPage from "./pages/FrontPage";
import StudentSchedule from "./pages/StudentSchedule";
import AdminDashboard from "./pages/AdminDashboard";
import {useAuth0} from "@auth0/auth0-react";
import {useDispatch} from "react-redux";
import {getUser} from "./redux/actions/user.actions";
import {useAppSelector} from "./hooks";
import Spinner from "./components/Spinner";

const Routes = () => {
    const dispatch = useDispatch()
    const { isLoading, isAuthenticated, getAccessTokenSilently} = useAuth0()
    const profile = useAppSelector(state => state.user)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        if (isAuthenticated) {
            getAccessTokenSilently().then(t => {
                dispatch(getUser(t))
            })
        }
    }, [dispatch, getAccessTokenSilently, isAuthenticated])

    useEffect(() => {
        if ((profile.role || !isAuthenticated) && !isLoading) {
            setIsReady(true)
        }
    }, [profile.role, isAuthenticated, isLoading])

    if (!isReady) {
        return <Spinner/>;
    }

    switch (profile.role) {
        case "Admin":
            return (
                <Switch>
                    <Route path="/" exact>
                        <AdminDashboard/>
                    </Route>
                    <Redirect to="/"/>
                </Switch>
            );
        case "Student":
        case "Teacher":
        default:
            return (
                <Switch>
                    <Route path="/" exact>
                        <Layout>
                            <FrontPage/>
                        </Layout>
                    </Route>
                    <Route path="/student-schedule" exact>
                        <Layout>
                            <StudentSchedule/>
                        </Layout>
                    </Route>
                    <Redirect to="/"/>
                </Switch>
            );

    }
};

export default Routes;
