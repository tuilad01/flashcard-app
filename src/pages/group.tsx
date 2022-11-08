import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, DropdownButton, Dropdown, Modal, Form } from 'react-bootstrap';
import { onClickButtonWithSound } from '../components/common/onClickButtonWithSound';
import GridData from '../components/grid-data/grid-data';
import Navbar from '../components/navbar/navbar';
import { seedData } from './trainData';
import './group.scss'

const groupLocalId = "137a86dc-93d6-442d-a484-ce539b0264c7"

const columns = [
    {
        name: "name",
        displayName: "Name"
    },
    {
        name: "description",
        displayName: "Description"
    },
]

function GroupPage() {
    const pageName = "Group"

    const [show, setShow] = useState(false);
    const [modal, setModal] = useState<{ title: string, type: "import" | "export" }>({ title: "", type: "import" })
    const [input, setInput] = useState("")

    useEffect(() => {
        const strGroupLocal = localStorage.getItem(groupLocalId)
        if (strGroupLocal) {
            setInput(strGroupLocal)
        } else {
            localStorage.setItem(groupLocalId, JSON.stringify(seedData))
            setInput(JSON.stringify(seedData))
        }
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = (type: "import" | "export") => {
        setModal({ title: type, type: type });
        setShow(true);
    }

    const onSaveChanges = () => {
        localStorage.setItem(groupLocalId, JSON.stringify(input))
        setShow(false)
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Navbar pageName={pageName} />

                        <DropdownButton id="dropdown-basic-button" title="Import/Export" variant="success">
                            <Dropdown.Item onClick={e => onClickButtonWithSound(() => handleShow("import"))}>Import</Dropdown.Item>
                            <Dropdown.Item onClick={e => onClickButtonWithSound(() => handleShow("export"))}>Export</Dropdown.Item>
                        </DropdownButton>

                        <GridData columns={columns} />
                    </Col>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modal.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control as="textarea" rows={6} value={input} onChange={e => setInput(e.currentTarget.value)} placeholder={modal.type} />
                </Modal.Body>

                <Modal.Footer>
                    {modal.type === "import" &&
                        (
                            <Button variant="primary" onClick={onSaveChanges}>
                                Save Changes
                            </Button>
                        )
                    }
                    <Button variant="secondary" onClick={() => onClickButtonWithSound(handleClose)}>
                        Close
                    </Button>

                </Modal.Footer>

            </Modal>

        </div>
    );
}

export default GroupPage;