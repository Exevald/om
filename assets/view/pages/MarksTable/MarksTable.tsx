import React, {useContext, useState} from "react";
import './MarksTable.scss';


import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import {createRoot} from "react-dom/client";

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
    return (
        <div className="marksTable__groupHeader">
            <h4>{props.groupName}</h4>
            <p onClick={() => props.setState(TableState.edit)}>
                Редактировать страницу
            </p>
        </div>
    )
}


const ButtonList = () => {
    const context = useContext(TableContext)
    return (
        <div className="marksTable__buttons">
            {
                context.state === TableState.default &&
                <>
                    <Button type="transparent" data="?"/>
                    <Button type="transparent" data="Добавить работу" iconType="add"/>
                    <Button type="transparent" data="Удалить работу" iconType="minus"/>
                    <Button type="transparentDisabled" data="Сохранить"/>
                </>
            }{

        }
        </div>
    )
}

interface TableGroupHeaderProps {
    groupName: string;
}

const TableGroupHeader = (props: TableGroupHeaderProps) => {
    return (
        <TableContext.Consumer>
            {
                value =>
                    <div className="marksTable__header">
                        <GroupArea groupName={props.groupName} setState={value.setState}/>
                        <ButtonList/>
                    </div>
            }
        </TableContext.Consumer>
    )
}


// заглушка для данных по группе
const data = {
    group: {
        name: '11 класс',
        subject: 'Физика'
    },
    students: [
        {id: '1', lastName: 'Шиханова', firstName: 'Дарья'},
        {id: '2', lastName: 'Викторов', firstName: 'Роберт'},
        {id: '3', lastName: 'Баянова', firstName: 'Наталия'},
        {id: '4', lastName: 'Грустный', firstName: 'Павел'},
        {id: '5', lastName: 'Зелепупкович', firstName: 'Афанасий'},
        {id: '6', lastName: 'Апполинарьев', firstName: 'Владлен'},
    ]
}

const GroupTable = () => {
    const [state, setState] = useState<TableState>(TableState.default);
    return (
        <>
            <TableContext.Provider
                value={{state, setState}}>
                <TableGroupHeader groupName={data.group.name}/>
                <Table subject={data.group.subject} students={data.students}/>
            </TableContext.Provider>
        </>
    )
}

// заглушка для пользователя
const user = {
    shortName: 'Рамазанова З.Т.',
    imgUrl: ''
}

const MarksTable = () => {
    return (
        <div className="marksTable__wrapper">
            <Header title="Журнал" userData={user}/>
            <GroupTable/>
        </div>
    )
}

const renderMarksTable = (rootId: string) => {
    const rootElement = document.getElementById(rootId)
    const root = createRoot(rootElement)

    root.render(
        <React.StrictMode>
            <MarksTable/>
        </React.StrictMode>
    )
}

export {renderMarksTable}