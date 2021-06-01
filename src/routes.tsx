import React, {useEffect, useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Layout from "./containers/Layout";
import FrontPage from "./pages/FrontPage";
import StudentSchedule from "./pages/StudentSchedule";
import AdminDashboard from "./pages/AdminDashboard";
import {useAuth0} from "@auth0/auth0-react";
import {useDispatch} from "react-redux";
import {getUser} from "./redux/actions/user.actions";
import {useAppSelector} from "./hooks";
import Spinner from "./components/Spinner";
import TeacherSchedule from "./pages/TeacherSchedule";
import StudentCodePage from "./pages/StudentCodePage";
import TeacherAttendancePage from "./pages/TeacherAttendancePage";


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
            return (
                <Switch>
                    <Route path="/" exact>
                        <Layout role={"Student"}>
                            <StudentSchedule/>
                        </Layout>
                    </Route>
                    <Route path="/code" exact>
                        <Layout role={"Student"}>
                            <StudentCodePage/>
                        </Layout>
                    </Route>
                    <Redirect to="/"/>
                </Switch>
            );
        case "Teacher":
            return (
                <Switch>
                    <Route path="/" exact>
                        <Layout role={"Teacher"}>
                            <TeacherSchedule/>
                        </Layout>
                    </Route>
                    <Route path="/attendance/:id" exact>
                        <Layout role={"Teacher"}>
                            <TeacherAttendancePage/>
                        </Layout>
                    </Route>
                    <Redirect to="/"/>
                </Switch>
            );
        default:
            return (
                <Switch>
                    <Route path="/" exact>
                        <Layout role={"default"}>
                            <FrontPage/>
                        </Layout>
                    </Route>
                    <Redirect to="/"/>
                </Switch>
            );

    }
};

export default Routes;
