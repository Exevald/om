import {Group, Student, User} from "./types"

type StateBase = {
    user: User
}

type GroupsState = {
    groups: Array<Group>
}
type EditGroupState = {
    group: Group
}


export {StateBase, GroupsState, EditGroupState}