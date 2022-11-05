import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Flashcard from '../components/flashcard/flashcard';
import Navbar from '../components/navbar/navbar';
import './train.scss'
import { data } from './trainData';

function TrainPage() {
    const pageName = "Train"
    const [index, setIndex] = useState(0)

    const {en, vi} = data[index]
    console.log(index)
    return (
        <Container>
            <Row>
                <Col>
                    <Navbar pageName={pageName} />
                    <Flashcard front={en} back={vi}></Flashcard>
                    
                    <div className='d-flex justify-content-center mt-2'>
                        <Button variant="primary" onClick={() => setIndex(index > 3 ? 0 : index + 1)}>
                            Next <i className="bi bi-chevron-right"></i>
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default TrainPage;