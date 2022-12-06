import { Action } from 'history';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap'
import TablePagination, { Pagination } from './test-table-pagination-component';

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

export type DataSource = {
    data: Data[]
    total: number
}

export type Data = {
    [key: string]: any
    id: string | number
}

export type Query = {
    name: string
    value: string
}



const getTotalPage = (total: number, pageSize: number): number => {
    return Math.ceil(total / pageSize)
}




function TestTable({ dataSource, columns, renderForm, onDelete, onSubmitForm, onChangePage, pageNumber = 1, pageSizes = [10,20,50] }: { dataSource: DataSource, columns: Column[], renderForm?: (formProps: FormProps) => JSX.Element, onDelete?: (selectedData: any) => boolean, onSubmitForm?: (form: any) => Data, onChangePage?: (pagination: any, query?: Query[]) => DataSource, pageNumber?: number, pageSizes?: number[] }) {
    const defaultPagination: Pagination = {
        pageNumber: pageNumber,
        pageSize: pageSizes[0],
        pageSizes: pageSizes,
        total: dataSource.total,
        pages: []
    }

    const [data, setData] = useState<Data[]>(dataSource.data)

    const [action, setAction] = useState<{ name: "list" | "add" | "edit", selectedData?: any }>({ name: 'list' })

    const [query, setQuery] = useState<Query[]>([])

    const [paginationProps, setPaginationProps] = useState<Pagination>(defaultPagination)

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
        setAction({ name: "list" })
    }

    const onSubmitInForm = (form: any) => {
        if (onSubmitForm) {
            const newData = onSubmitForm(form)
            if (newData) {
                if (action.name === "add") {
                    // add a new data in the data state
                    setData([newData, ...data])
                    setAction({ name: "list" })
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
            } else {
                alert("cannot submit the form!")
            }

        }
    }

    const onChangePageInPagination = (pagination: Pagination): number => {
        if (onChangePage) {
            const newDataSource = onChangePage(pagination, query)
            if (newDataSource) {
                //setTotal
                setData(newDataSource.data)
                setPaginationProps({...paginationProps, total: newDataSource.total, pageNumber: pagination.pageNumber, pageSize: pagination.pageSize})


                // return total number of records to calculate pages in the pagination component 
                //return newDataSource.total
            }
        }

        return 0
    }

    const renderByAction = (): JSX.Element => {

        if (renderForm) {
            if (action.name === "add") {
                return renderForm({ onCancel: onCancelInForm, onSubmit: onSubmitInForm })
            } else if (action.name === "edit") {
                return renderForm({ onCancel: onCancelInForm, onSubmit: onSubmitInForm, data: action.selectedData })
            }
        }


        return (
            <>
                <Button variant="primary" onClick={() => setAction({ name: "add" })}>
                    Add
                </Button>
                <Table striped bordered hover responsive>
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
                                        <Button variant="warning" className="ml-1" onClick={() => setAction({ name: "edit", selectedData: record })}>
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>

                <TablePagination total={paginationProps.total} onChangePage={onChangePageInPagination} pageNumber={paginationProps.pageNumber} pageSize={paginationProps.pageSize} pageSizes={paginationProps.pageSizes}></TablePagination>
            </>
        )
    }


    return (
        renderByAction()
    );
}

export default TestTable;