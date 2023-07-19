import {EditGroupState, StateBase} from "./states";
import {atom} from "@reatom/core";

type EditGroupBase = StateBase | EditGroupState

const EDIT_GROUP_INITIAL_STATE: EditGroupBase = {
    user: {id: '', firstname: '', lastname: ''},
    group: {
        id: '',
        name: '',
        subject: '',
        studentsList: [],
        tasksList: []
    }
}
const editGroupAtom = atom(EDIT_GROUP_INITIAL_STATE, 'editGroupAtom')
