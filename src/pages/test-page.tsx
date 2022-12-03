import TestTable, { Column, FormProps, Data } from "../components/test/test-table-component";
import { v4 as uuidv4 } from 'uuid'
import TestForm from "../components/test/test-form-component";
import { useState } from "react";

const dataInitialization: Data[] = [
    {
        id: 1,
        name: "item 1",
        description: "abc"
    },
    {
        id: 2,
        name: "item 2",
    }
    ,
    {
        id: 3,
        name: "item 3",
    }
    ,
    {
        id: 4,
        name: "item 4",
    }
]

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



function TestPage() {

    const renderForm = (formProps: FormProps): JSX.Element => {

        const defaultValue = { id: "", name: "" }
        const props = { ...formProps, data: formProps.data || defaultValue }

        // your form here...
        return (
            <TestForm {...props}></TestForm>
        )
    }

    const onDelete = (data: any): boolean => {
        // call API to delete data 
        return true;
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


    return (
        <>
            <TestTable dataSource={dataInitialization} columns={columns} renderForm={renderForm} onSubmitForm={onSubmit} onDelete={onDelete} />
        </>
    );
}

export default TestPage;