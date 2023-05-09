type Group = {
    id: string,
    name: string,
    subject: string,
    studentsList: Array<Student>,
    tasksIdLIst: Array<Task>
}

type Student = {
    id: string,
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

export { Group, Student, Mark, Task }