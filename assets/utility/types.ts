type Group = {
    id: string,
    name: string,
    subject: string,
    studentsList: Array<Student>,
    tasksList: Array<Task>
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
    date: Date,
    maxMark: number,
    marksList: Array<number>
}

type TaskFrontData = {
    groupId: number,
    topic: string,
    description: string,
    maxMark: number
}

export { Group, GroupFrontData, Student, StudentFrontData, Mark, Task, TaskFrontData }