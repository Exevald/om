import {configureStore} from "@reduxjs/toolkit";
import {groupReducer} from "./group";
import {studentReducer} from "./student";
import {INITIAL_STATE} from "./state";


const store = configureStore({
    reducer: {
        group: groupReducer,
        student: studentReducer
    }
    //TODO: найти как сделать начальное состояние
    //INITIAL_STATE
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch


export default store;
export { RootState, AppDispatch }