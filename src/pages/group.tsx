import { useState } from 'react';
import { Container, Row, Col, Button, DropdownButton, Dropdown, Modal, Form } from 'react-bootstrap';
import { onClickButtonWithSound } from '../components/common/onClickButtonWithSound';
import GridData from '../components/grid-data/grid-data';
import Navbar from '../components/navbar/navbar';
import './group.scss'

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

    const handleClose = () => setShow(false);
    const handleShow = (type: "import" | "export") => {
        if (type === "import") {
            // import

        } else {
            // export

        }

        setModal({ title: type, type: type });
        setShow(true);
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
                    <Form.Control as="textarea" placeholder="Placeholder" rows={6} />

                </Modal.Body>

                <Modal.Footer>
                    {modal.type === "import" &&
                        (
                            <Button variant="primary" onClick={handleClose}>
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