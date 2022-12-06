import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap'
import Navbar from '../components/navbar/navbar';

function UploadPage() {
    const pageName = "Upload page"
    const [list, setList] = useState<any[]>([])
    const [server, setServer] = useState("")

    const getList = () => {
        fetch(server + "/dictionary")
            .then(res => res.json())
            .then(list => {
                if (list) {
                    console.log(list)
                }
            })


        //alert(server)
    }



    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Navbar pageName={pageName} />




                        <div className='d-flex d-inline-flex mb-2'>
                            <div>
                                <Form.Control type="text" value={server} onChange={e => setServer(e.currentTarget.value)} placeholder="Your server api https://..." />
                            </div>
                            <div className='ml-2'>
                                <Button variant="primary" onClick={() => getList()}>
                                    Get list
                                </Button>
                            </div>
                        </div>


                        <ListGroup>
                            {list.map((item: any, index: number) => {
                                return (
                                    <ListGroup.Item action key={`listGroupItemKey_${index}`}>Dapibus ac facilisis in</ListGroup.Item>

                                )
                            })}
                        </ListGroup>

                        {/* <div className="mb-2">
                            <Button variant="primary" onClick={() => onImport()}>
                                Import
                            </Button>
                        </div>
                        <Form.Control as="textarea" type="text" value={jsonData} onChange={e => setJsonData(e.currentTarget.value)} rows={20} placeholder="Placeholder text" /> */}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default UploadPage;