import { useState } from 'react';
import { Container, Row, Col, ListGroup, Alert, Modal, Button, Form } from 'react-bootstrap'
import Navbar from "../components/navbar/navbar";


function SettingPage() {
    const pageName = "Settings"

    const [show, setShow] = useState(false);
    const [formKeyValue, setFormKeyValue] = useState<any>({key: "", value: ""})

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onChangeFormKeyValue = (event: any) => {
        const value = event.target.value
        setFormKeyValue((prev: any) => ({...prev, value: value}))
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Navbar pageName={pageName} />
                    </Col>
                </Row>

                <Row>
                    <Col md="6">
                        <Alert variant="danger">
                            <i className="bi bi-exclamation-octagon-fill"></i> Please set the key name before uploading/downloading data
                        </Alert>

                        <ListGroup>
                            <ListGroup.Item action onClick={e => handleShow()}>
                                <div className='d-flex justify-content-between align-content-center'>
                                    <div>Set the key name to upload/download</div>
                                    <div className='fst-italic'>Dat</div>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item action onClick={e => alert("upload")}>
                                <div className='d-flex justify-content-between align-content-center'>
                                    <div>Upload data</div>
                                    <div className='fst-italic'>20/11/2022 2:54 PM</div>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item action onClick={e => alert("download")}>
                                <div className='d-flex justify-content-between align-content-center'>
                                    <div>Download data</div>
                                    <div className='fst-italic'>20/11/2022 2:54 PM</div>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Set value</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control as="input" value={formKeyValue.value} onChange={onChangeFormKeyValue} placeholder={"value..."} />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
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

export default SettingPage;