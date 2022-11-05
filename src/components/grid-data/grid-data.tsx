import { useState } from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { mockData } from './mockdata';

function GridData({ columns }: { columns?: any[] }) {
    // data list 
    const [data, setData] = useState(mockData);
    const [show, setShow] = useState(false);

    // Modal events
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Add button is clicked
    const onClickAddButton = () => {

    }

    // When a object is changed
    const onChange = ({ type, index, obj }: { type: string, index: number, obj: any }) => {

    }

    return (
        <div>

            <div className="d-flex justify-content-end mb-2">
                <Button variant="primary" onClick={onClickAddButton}>
                    <i className="bi bi-plus-lg"></i> Add
                </Button>
            </div>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        {columns?.map((col) => (
                            <th>{col.displayName}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((gr: any, index: number) => (
                        <tr>
                            <td>{index + 1}</td>
                            {columns?.map((col) => (
                                <td>{gr[col.name]}</td>
                            ))}
                            <td>
                                <DropdownButton id="dropdown-basic-button" title="Actions" variant="success">
                                    <Dropdown.Item onClick={e => alert("edit")}>Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={e => alert("Delete")}>Delete</Dropdown.Item>
                                </DropdownButton>
                            </td>
                        </tr>
                    ))}
        
                </tbody>
            </Table>
        </div>
    );
}

export default GridData;