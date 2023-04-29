import React, { useState } from "react";
import './MarksTable.scss';


import Header from "../../components/Header/Header";

const TableContext = React.createContext(null);

enum TableState {
    default,
    edit,
    delete
}

interface GroupAreaProps {
    groupName: string,
    setState: React.Dispatch<React.SetStateAction<TableState>>
}
const GroupArea = (props: GroupAreaProps) => {
    return(
        <div>
            <h4>{props.groupName}</h4>
            <p onClick={() => props.setState(TableState.edit)}>
                Редактировать страницу
            </p>
        </div>
    )
}
const ButtonList = () => {
    return(
        <></>
    )
}
const TableHeader = () => {
    return(
        <TableContext.Consumer>
        {
            value =>
            <>
                <GroupArea groupName={value.group.name} setState={value.setState} />
                <ButtonList/>
            </>
        }
        </TableContext.Consumer>
    )
}


const Table = () => {
    return(
        <></>
    )
}


// заглушка для данных по группе
const data = {
    group: {
        name: '11 класс',
        subject: 'Физика'
    },
    students: [
        {surname: 'Шиханова',       name: 'Дарья'},
        {surname: 'Викторов',       name: 'Роберт'},
        {surname: 'Баянова',        name: 'Наталия'},
        {surname: 'Грустный',       name: 'Павел'},
        {surname: 'Зелепупкович',   name: 'Афанасий'},
        {surname: 'Апполинарьев',   name: 'Владлен'},
    ]
}

const GroupTable = () => {
    const [state, setState] = useState<TableState>(TableState.default);
    const [group, setGroup] = useState(data.group);
    return(
        <div>
            <TableContext.Provider
                value={{ state, setState, group, setGroup
            }}>
                <TableHeader/>
                <Table/>
            </TableContext.Provider>
        </div>
    )
}

// заглушка для пользователя
const user = {
    shortName: 'Рамазанова З.Т.',
    imgUrl: ''
}

const MarksTable = () => {
    return(
        <div className="marksTable__wrapper">
            <Header title="Журнал" userData={user} />
            <GroupTable/>
        </div>
    )
}

export default MarksTable;
