import {Group, User} from "./types";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {groupReducer} from "./group";
import {studentReducer} from "./student";
enum AppState {
    default,
    edit,
    delete
}

type State = {
    appState: AppState
    user: User
    groups: Array<Group>
}

const INITIAL_STATE: State = {
    appState: AppState.default,
    user: {id: '', firstname: '', lastname: '', patronymic: ''},
    groups: [{
        id: '',
        name: '',
        subject: '',
        studentsList: [],
        tasksList: []
    }]
}

const mainReducer = combineReducers({
    group: groupReducer,
    student: studentReducer
})

const store = configureStore(mainReducer)

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch


export default store;
export { RootState, AppDispatch }