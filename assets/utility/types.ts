type Group = {
    id: string,
    name: string,
    subject: string,
    studentsList: Array<Student>,
    tasksIdLIst: Array<Task>
}

type GroupFrontData = {
    name: string,
    subject: string
}

type Student = {
    id: string,
    firstName: string,
    lastName: string
}
type StudentFrontData = {
    groupId: number,
    firstName: string,
    lastName: string
}


type Mark = {
    id: number,
    studentId: number,
    studentMark: number
}

type Task = {
    id: number,
    topic: string,
    description: string,
    // потом свяжу время
    // date: Date,
    maxMark: number,
    marksList: Array<number>
}

export { Group, GroupFrontData, Student, StudentFrontData, Mark, Task }