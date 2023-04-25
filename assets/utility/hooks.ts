import { useCallback, useState } from "react";

function useToggle(initialState: any) {
    const [isToggled, setIsToggled] = useState(initialState);
    const toggle = useCallback(() => setIsToggled(!isToggled), [isToggled]);

    return [isToggled, toggle]
}

export { useToggle };