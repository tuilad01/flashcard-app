import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Card from '../components/card/card';
import Navbar from '../components/navbar/navbar';
import { onClickButtonWithSound } from '../components/common/onClickButtonWithSound';
import './train.scss'
//import { data } from './trainData';

const groupLocalId = "137a86dc-93d6-442d-a484-ce539b0264c7"

function TrainPage() {
    const pageName = "Train"
    let index = 0;
    //const [groupData, setGroupData] = useState<[{id: string, name: string, description: string, items: {vi: string, en: string}[]}]>([{ id: "1", name: "test", description: "test", items: [] }])
    const [sentences, setSentences] = useState<{vi: string, en: string}[]>([])
    const [flashcard, setFlashcard] = useState({ front: "", back: "", index: index })
    const [hasInput, setHasInput] = useState(false)

    useEffect(() => {
        const strLocal = localStorage.getItem(groupLocalId)
        if (strLocal) {
            const sentences = strLocal.replaceAll('\"', '').split("\\n").map(line => {
                const sentence = line.split(",")
                return {
                    en: sentence[0],
                    vi: sentence[1] ?? ""
                }
            })
            setSentences(sentences)
            setFlashcard({ front: sentences[index].en, back: sentences[index].vi, index: index })
            //const groupLocal = JSON.parse(strGroupLocal)
            //setGroupData(groupLocal)
            //setFlashcard({ front: groupLocal[0].items[index].vi, back: groupLocal[0].items[index].en, index: index })
        }
    }, [])


    const onClickNext = () => {

        //console.log(`nextIndex = ${nextIndex}`)
        setFlashcard(prev => {
            const nextIndex = prev.index > sentences.length - 2 ? 0 : prev.index + 1
            if (nextIndex >= 0)
                return {
                    front: sentences[nextIndex].en,
                    back: sentences[nextIndex].vi,
                    index: nextIndex,
                }
            else {
                return {...prev}
            }
        })
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Navbar pageName={pageName} />

                    <Button className="mb-2" variant="danger" onClick={() => onClickButtonWithSound(() => setHasInput(!hasInput))}>
                        <i className="bi bi-chat-heart"></i> Toggle
                    </Button>

                    <Card front={flashcard.front} back={flashcard.back} hasInput={hasInput} onNext={onClickNext}></Card>

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