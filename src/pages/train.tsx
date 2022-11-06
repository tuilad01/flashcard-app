import { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Card from '../components/card/card';
import Navbar from '../components/navbar/navbar';
import { onClickWithSound } from '../components/common/onClickWithSound';
import './train.scss'
import { data } from './trainData';

function TrainPage() {
    const pageName = "Train"
    let index = 0;
    const [flashcard, setFlashcard] = useState({ front: data[index].en, back: data[index].vi, index: index })
    const [hasInput, setHasInput] = useState(false)
    //console.log(index)

    const onClickNext = () => {

        //console.log(`nextIndex = ${nextIndex}`)
        setFlashcard(prev => {
            const nextIndex = prev.index > data.length - 2 ? 0 : prev.index + 1
            return {
                front: data[nextIndex].en,
                back: data[nextIndex].vi,
                index: nextIndex,
            }
        })
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Navbar pageName={pageName} />

                    <Button className="mb-2" variant="danger" onClick={() => onClickWithSound(() => setHasInput(!hasInput))}>
                        <i className="bi bi-chat-heart"></i> Toggle
                    </Button>

                    <Card front={flashcard.back} back={flashcard.front} hasInput={hasInput} onNext={onClickNext}></Card>

                    {/* <Form.Control placeholder="enter..." /> */}

                    {/* <div className='d-flex justify-content-center mt-2'>
                        <Button variant="primary" onClick={_ => onClickWithSound(() => onClickNext())}>
                            Next <i className="bi bi-chevron-right"></i>
                        </Button>
                    </div> */}
                </Col>
            </Row>
        </Container>
    );
}

export default TrainPage;