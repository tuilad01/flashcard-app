import TestTable, { Column, FormProps, Data, DataSource } from "../components/test/test-table-component";
import { v4 as uuidv4 } from 'uuid'
import TestForm from "../components/test/test-form-component";
import { useState } from "react";
import { Pagination } from "../components/test/test-table-pagination-component";

const initializeData = () => {
    const data: Data[] = []
    for (let index = 0; index < 100; index++) {
        data.push({
            id: index + 1,
            name: `item ${index + 1}`
        })

    }

    return data
}

const queryData = (pageNumber: number, pageSize: number, data: any[]) => {
    const index = (pageNumber - 1) * pageSize

    return data.slice(index, index + pageSize)
}

const columns: Column[] = [
    {
        name: "id",
        displayName: "ID",
        type: "text"
    },
    {
        name: "name",
        displayName: "Name",
        type: "text"
    },
]

const defaultPagination = {
    pageNumber: 2,
    pageSize: 10,
    pageSizes: [10, 20, 30, 50]
}

function TestPage() {
    const dataInitialization = initializeData()

    const renderForm = (formProps: FormProps): JSX.Element => {

        const defaultValue = { id: "", name: "" }
        const props = { ...formProps, data: formProps.data || defaultValue }

        // your form here...
        return (
            <TestForm {...props}></TestForm>
        )
    }

    const onDelete = (data: Data): boolean => {
        // call API to delete data
        const index = dataInitialization.findIndex(d => d.id === data.id)
        if (index >= 0) {
            dataInitialization.splice(index, 1)

            // return true to delete data in table
            return true;
        }

        return false;
    }

    const onSubmit = (form: any): Data => {
        if (form.id) {
            // update
            // call API to update data
            // return updated data.       


        } else {
            // add
            // call API to add data        
            // return the new object for adding it in the table, otherwise, return null
            form.id = uuidv4()

        }

        return form
    }

    const onChangePage = (pagination: Pagination): DataSource => {
        //call API get new data for pagination
        const newArrayData = queryData(pagination.pageNumber, pagination.pageSize, dataInitialization)

        return {
            data: newArrayData,
            total: dataInitialization.length
        }
    }

    return (
        <>
            <TestTable dataSource={{ data: queryData(defaultPagination.pageNumber, defaultPagination.pageSize, dataInitialization), total: dataInitialization.length }} columns={columns} renderForm={renderForm} onSubmitForm={onSubmit} onDelete={onDelete} onChangePage={onChangePage} pageNumber={2} pageSizes={defaultPagination.pageSizes} />
        </>
    );
}

export default TestPage;