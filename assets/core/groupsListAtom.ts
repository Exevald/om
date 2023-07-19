import {atom} from "@reatom/core";
import {GroupsState, StateBase} from "./states";


type GroupsListBase = StateBase | GroupsState

const GROUPS_INITIAL_STATE: GroupsListBase = {
    user: {id: '', firstname: '', lastname: ''},
    groups: []
}

const groupsAtom = atom(GROUPS_INITIAL_STATE, 'groupsAtom')
