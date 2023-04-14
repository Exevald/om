type Group = {
    name: string,
    subject: string
}

type Student = {
    name: string,
    surname: string
}

type GetData = {
    group: Group,
    students: Array<Student>
}

export {Group, Student, GetData}