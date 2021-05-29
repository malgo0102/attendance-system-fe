import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {routerMiddleware, connectRouter} from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';
import {
    adminReducer,
    adminSaga, DataProvider
} from 'react-admin';
import {History} from "history";
import userReducer from "./user.reducer";
import * as userSaga from "../sagas/user.saga";
import * as teacherCoursesSaga from "../sagas/teacher.courses.saga";
import * as teacherScheduleEventsSaga from "../sagas/teacher.schedule-events.saga";
import teacherCoursesReducer from "./teacher.courses.reducer";
import teacherScheduleEventsReducer from "./teacher.schedule-events.reducer";

const createAppStore = ({
                            dataProvider,
                            history,
                        }: { dataProvider: DataProvider, history: History }) => {
    const reducer = combineReducers({
        admin: adminReducer,
        router: connectRouter(history),
        user: userReducer,
        teacherCourses: teacherCoursesReducer,
        teacherScheduleEvents: teacherScheduleEventsReducer
    });

    const saga = function* rootSaga() {
        yield all(
            [
                adminSaga(dataProvider, null),
                userSaga.watchRequestProfile(),
                teacherCoursesSaga.watchRequestTeacherCourses(),
                teacherScheduleEventsSaga.watchCreateScheduleEvents(),
                teacherScheduleEventsSaga.watchGetOwnScheduleEvents()
            ]
        );
    };
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers =
        process.env.NODE_ENV === "development"
            // @ts-ignore
            ? (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
            : compose;

    const store = createStore(
        reducer,
        composeEnhancers(
            applyMiddleware(
                sagaMiddleware,
                routerMiddleware(history),
                // add your own middlewares here
            ),
            // add your own enhancers here
        ),
    );
    sagaMiddleware.run(saga);
    return store;
};

export default createAppStore
