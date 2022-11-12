import { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, Modal, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
//import { mockData } from './mockdata';
import { v4 as uuidv4 } from 'uuid';

const groupLocalId1 = "F4558EC9-9AA1-468E-BBB0-DA44321A6D40"

function GridData({ columns }: { columns?: any[] }) {
    // data list 
    const [data, setData] = useState<any[]>([]);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({ id: "", name: "", description: "", items: "" });

    useEffect(() => {
        const arrGroup = getDataLocal(groupLocalId1);
        setData(arrGroup);
    }, [])


    // Modal events
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Add button is clicked
    const onClickAddButton = () => {
        if (form.id) {
            setForm({ id: "", name: "", description: "", items: "" });
        }
        handleShow()
    }

    // When a object is changed
    const onChange = ({ type, index, obj }: { type: string, index: number, obj: any }) => {

    }

    const onSave = () => {
        console.log(form)
        try {
            if (form.id) {
                // TODO: group existed
                // for updating a group
                const element = data.find(d => d.id === form.id)
                if (element) {
                    element.name = form.name;
                    element.description = form.description;
                    element.items = form.items;                    
                    const newArrGroup = [...data]
                    setDataLocal(groupLocalId1, newArrGroup)
                    setData(newArrGroup);
                }

            } else {
                // group is not existed
                // for adding a new group
                const arrGroup = getDataLocal(groupLocalId1);
                const newGroup = { ...form, id: uuidv4() }

                arrGroup.push(newGroup)
                setDataLocal(groupLocalId1, arrGroup)
                setData(arrGroup);
            }
        } catch (error: any) {
            console.error(error);
            alert(error.message)
            return;
        }

        handleClose();
        setForm({ id: "", name: "", description: "", items: "" })
    }

    const getDataLocal = (key: string): any[] => {
        const str = localStorage.getItem(key)
        if (str) {
            return JSON.parse(str)
        }

        return []
    }

    const setDataLocal = (key: string, obj: any) => {
        localStorage.setItem(key, JSON.stringify(obj))
    }

    const onDelete = (index: number) => {
        if (window.confirm("Are you sure?")) {
            const elementRemoved = data.splice(index, 1);
            const arrGroup = getDataLocal(groupLocalId1)

            const newArrGroup = arrGroup.filter(gr => gr.id !== elementRemoved[0].id)
            setDataLocal(groupLocalId1, newArrGroup)
            setData(newArrGroup);
        }
    }

    const onEdit = (index: number) => {
        const element = data[index]
        setForm({id: element.id, name: element.name, description: element.description, items: element.items})
        handleShow()
    }



    const onFormChange = (name: string, value: string) => {
        setForm(prev => ({ ...prev, [name]: value }));
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
                        {columns?.map((col, index) => (
                            <th key={`colNameKey_${index}`}>{col.displayName}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((gr: any, index: number) => (
                        <tr key={`grRowKey_${index}`}>
                            <td>{index + 1}</td>
                            {columns?.map((col, colIndex) => (
                                <td key={`cellKey_${colIndex}`}>{gr[col.name]}</td>
                            ))}
                            <td>
                                <DropdownButton id="dropdown-basic-button" title="Actions" variant="success">
                                    <Dropdown.Item onClick={e => onEdit(index)}>Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={e => onDelete(index)}>Delete</Dropdown.Item>
                                </DropdownButton>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="inputName">Name</Form.Label>
                            <Form.Control id="inputName" value={form.name} onChange={e => onFormChange("name", e.currentTarget.value)} placeholder="Name..." />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="inputDescription">Description</Form.Label>
                            <Form.Control id="inputDescription" value={form.description} onChange={e => onFormChange("description", e.currentTarget.value)} placeholder="Description..." />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="inputItems">Items</Form.Label>
                            <Form.Control as="textarea" id="inputItems" value={form.items} onChange={e => onFormChange("items", e.currentTarget.value)} placeholder="Items..." />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={onSave}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>

            </Modal>

        </div>
    );
}

export default GridData;