import React, {useEffect, useState} from "react";
import {Admin, DataProvider, ShowGuesser, Resource} from 'react-admin';
import UsersList from "../admin/components/UsersList";
import {history} from "../index";
import ClassesList from "../admin/components/ClassesList";
import ClassesCreate from "../admin/components/ClassesCreate";
import ClassesEdit from "../admin/components/ClassesEdit";
import UsersCreate from "../admin/components/UsersCreate";
import UsersEdit from "../admin/components/UsersEdit";
import {useAuth0} from "@auth0/auth0-react";
import {dataProvider as createDataProvider} from "../admin/data-provider";
import Spinner from "../components/Spinner";
import authProvider from "../admin/auth-provider";
import ClassesShow from "../admin/components/ClassesShow";
import CoursesList from "../admin/components/CoursesList";
import CoursesEdit from "../admin/components/CoursesEdit";
import CoursesCreate from "../admin/components/CoursesCreate";


const AdminDashboard = () => {
    const {getAccessTokenSilently, isAuthenticated, loginWithRedirect, logout, user} = useAuth0()
    const [dataProvider, setDataProvider] = useState<DataProvider | undefined>(undefined)
    const customAuthProvider = authProvider({
        isAuthenticated,
        loginWithRedirect,
        logout,
        user,
    });

    useEffect(() => {
        getAccessTokenSilently().then(t => {
            setDataProvider(createDataProvider(t))
        });
    }, [getAccessTokenSilently])

    if (!dataProvider) {
        return <Spinner/>;
    }
    return (
        <div>
            <Admin dataProvider={dataProvider} history={history} authProvider={customAuthProvider}>
                <Resource name="users" list={UsersList} create={UsersCreate} edit={UsersEdit} show={ShowGuesser}/>
                <Resource name="classes" list={ClassesList} create={ClassesCreate} edit={ClassesEdit}
                          show={ClassesShow}/>
                <Resource name="courses" list={CoursesList} create={CoursesCreate} edit={CoursesEdit}/>
            </Admin>
        </div>
    )
}

export default AdminDashboard


