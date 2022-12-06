import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap'
import Navbar from '../components/navbar/navbar';
import { DailyTranslation, dailyTranslationService } from '../services/daily-translation-service';

const dictionaryEndpoint = "/dictionary";

function ImportPage() {
    const pageName = "Import page"
    const [data, setData] = useState<any[]>([])
    const [jsonData, setJsonData] = useState("")
    const [server, setServer] = useState("")
    const [list, setList] = useState<any[]>([])
    const [dictionaryName, setDictionaryName] = useState("")
    const [selectedDictionary, setSelectedDictionary] = useState<any>({})

    useEffect(() => {
        dailyTranslationService.getAll({}).then(list => {
            if (list) {
                setData(list)
                setJsonData(JSON.stringify(list))
            }
        })
    }, [])

    const onImport = () => {
        // delete the old data
        data.forEach(async (element: DailyTranslation) => {
            await dailyTranslationService.remove(element.id)
        });

        // add the new data
        const arr = JSON.parse(jsonData)
        if (arr instanceof Array) {
            arr.forEach(async (element: DailyTranslation) => {
                await dailyTranslationService.import(element);
            });
        }
    }

    const getList = () => {
        fetch(server + dictionaryEndpoint)
            .then(res => res.json())
            .then(list => {
                if (list) {
                    setList(list)
                }
            })


        //alert(server)
    }

    const onAdd = () => {
        if (!server || !dictionaryName) {
            alert("Please enter your server api and dictionary name!")
            return;
        }

        fetch(server + dictionaryEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: dictionaryName, value: jsonData })
        })
            .then(res => res.json())
            .then(dict => {
                if (dict && dict.Id) {
                    alert("The dictionary is added successfully.")
                }
            })

    }

    const onDelete = () => {
        if (!server || !dictionaryName) {
            alert("Please enter your server api and dictionary name!")
            return;
        }

        if (window.confirm("Are you sure?")) {
            fetch(server + dictionaryEndpoint + "/" + dictionaryName, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (res.status === 204) {
                        alert("The dictionary is deleted successfully.");
                    }
                })

        }
    }

    const onShowDictValue = (id: number) => {
        const dict = list.find(item => item.id === id)
        setSelectedDictionary(dict)
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


                        <ListGroup className="mb-2">
                            {list.map((item: any, index: number) => {
                                return (
                                    <ListGroup.Item action key={`listGroupItemKey_${index}`} onClick={() => onShowDictValue(item.id)}>{item.name}</ListGroup.Item>

                                )
                            })}
                        </ListGroup>

                        <div className="mb-2">
                            <Form.Control as="textarea" type="text" value={selectedDictionary.value} rows={20} />
                        </div>


                        <div className='d-flex d-inline-flex mb-2'>
                            <div>
                                <Form.Control type="text" value={dictionaryName} onChange={e => setDictionaryName(e.currentTarget.value)} placeholder="Enter dictionary name here..." />
                            </div>
                            <div className='ml-2'>
                                <Button variant="primary" onClick={() => onAdd()}>
                                    Add
                                </Button>
                                <Button variant="danger" onClick={() => onDelete()} className="ml-1">
                                    Delete
                                </Button>
                            </div>
                        </div>


                        <div className="mb-2">
                            <Button variant="primary" onClick={() => onImport()}>
                                Import
                            </Button>
                        </div>
                        <Form.Control as="textarea" type="text" value={jsonData} onChange={e => setJsonData(e.currentTarget.value)} rows={20} placeholder="Placeholder text" />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ImportPage;