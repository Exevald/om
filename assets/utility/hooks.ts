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

function isStrNonNegative(str: string): boolean {
    if(Number(str) >= 0){
        return true
    }
    else{
        return false
    }
}

function hasOnlyNumbers(str: string): boolean {
    if(str !== ""){
        if(isNaN(Number(str))) {
            return false
        } else  {
            return true
        }
    }
    else return  false
}


export { sortStudentsByInitials, hasOnlyNumbers, isStrNonNegative }