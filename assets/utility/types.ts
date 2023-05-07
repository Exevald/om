type Group = {
    name: string,
    subject: string
}

type Student = {
    name: string,
    surname: string
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