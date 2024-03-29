import { useCallback, useState } from "react";
import { Student } from "./types";

function useToggle(initialState: any) {
    const [isToggled, setIsToggled] = useState(initialState);
    const toggle = useCallback(() => setIsToggled(!isToggled), [isToggled]);

    return [isToggled, toggle]
}

export { useToggle };


function sortStudentsByInitials(a: Student, b: Student): number {
    if (a.lastName > b.lastName) {
        return 1
    } else if (a.firstName > b.firstName && a.lastName === b.lastName) {
        return 1
    } else return -1
}


export { sortStudentsByInitials }