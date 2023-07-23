import React from "react";
import './Header.scss'

import PersonArea, { PersonAreaProps } from "../PersonArea/PersonArea"


interface HeaderProps {
    title: string,
    userData: PersonAreaProps
}
const Header = (props: HeaderProps) => {
    return (
        <div className="header__wrapper">
            <h4>{props.title}</h4>
            <PersonArea shortName={props.userData.shortName} imgUrl={props.userData.imgUrl} />
        </div>
    )
}

export default React.memo(Header);