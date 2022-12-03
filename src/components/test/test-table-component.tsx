import { Action } from 'history';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap'

export type Column = {
    name: string
    displayName: string
    type: "text"
}

export type FormProps = {
    data?: any
    onCancel?: () => void,
    onSubmit?: (form: any) => void
}

export type Data = {
    [key: string]: any
    id: string | number

}


function TestTable({ dataSource, columns, renderForm, onDelete, onSubmitForm }: { dataSource: Data[], columns: Column[], renderForm?: (formProps: FormProps) => JSX.Element, onDelete?: (selectedData: any) => boolean, onSubmitForm?: (form: any) => Data }) {
    const [data, setData] = useState<Data[]>(dataSource)
    const [action, setAction] = useState<{ name: "list" | "add" | "edit", selectedData?: any }>({ name: 'list' })


    const onDeleteData = (selectedData: Data) => {
        if (window.confirm("Are you sure?")) {
            if (onDelete) {
                const result = onDelete(selectedData)
                if (result) {
                    const newData = data.filter(d => d.id !== selectedData.id)
                    setData([...newData])
                }
            }
        }
    }

    const onCancelInForm = () => {
        setAction({name: "list"})
    }

    const onSubmitInForm = (form: any) => {
        if (onSubmitForm) {
            const newData = onSubmitForm(form)
            if (action.name === "add") {
                // add a new data in the data state
                setData([...data, newData])
                setAction({name: "list"})
            } else {
                // update the data in the data state
                const prevData = data.find(d => d.id === newData.id)
                if (prevData) {
                    for (const key in prevData) {
                        if (Object.prototype.hasOwnProperty.call(prevData, key)) {
                            //const element = ;
                            prevData[key] = newData[key]
                        }
                    }

                    setData([...data])
                    alert("updated successfully")
                }
            }            
        }
    }

    const renderByAction = (): JSX.Element => {

        if (renderForm) {
            if (action.name === "add") {
                return renderForm({onCancel: onCancelInForm, onSubmit: onSubmitInForm})
            } else if (action.name === "edit") {
                return renderForm({onCancel: onCancelInForm, onSubmit: onSubmitInForm, data: action.selectedData})
            }
        }


        return (
            <>
                <Button variant="primary" onClick={() => setAction({name: "add"})}>
                    Add
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            {columns.map((col: Column, index: number) => {
                                return (
                                    <th key={`tableHeaderCol_${index}`}>{col.displayName}</th>
                                )
                            })}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((record: any, index: number) => {
                            return (
                                <tr key={`tableRow_${index}`}>
                                    <td>{index}</td>
                                    {columns.map((col: Column) => {
                                        return (
                                            <td key={`tablCell_${col.name}_${index}`}>{record[col.name]}</td>
                                        )
                                    })}
                                    <td>
                                        <Button variant="danger" onClick={() => onDeleteData(record)}>
                                            Delete
                                        </Button>
                                        <Button variant="warning" className="ml-1" onClick={() => setAction({name: "edit", selectedData: record})}>
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
            </>
        )
    }


    return (
        renderByAction()
    );
}

export default TestTable;