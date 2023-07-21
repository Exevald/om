import {Group, User} from "./types";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {groupReducer} from "./group";
import {studentReducer} from "./student";
enum RenderState {
    default,
    edit,
    delete
}

type State = {
    appState: RenderState
    user: User
    groups: Array<Group>
}

const INITIAL_STATE: State = {
    appState: RenderState.default,
    user: {id: '', firstname: '', lastname: '', patronymic: ''},
    groups: [{
        id: '',
        name: '',
        subject: '',
        studentsList: [],
        tasksList: []
    }]
}


export {RenderState, State, INITIAL_STATE}