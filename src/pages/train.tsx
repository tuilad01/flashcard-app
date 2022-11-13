import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Card from '../components/card/card';
import Navbar from '../components/navbar/navbar';
import { onClickButtonWithSound } from '../components/common/onClickButtonWithSound';
import './train.scss'
//import { data } from './trainData';
import { groupService } from '../services/group';

const groupIndex = 0
function TrainPage() {
    const pageName = "Train"
    let index = 0;
    //const [groupData, setGroupData] = useState<[{id: string, name: string, description: string, items: {vi: string, en: string}[]}]>([{ id: "1", name: "test", description: "test", items: [] }])
    const [sentences, setSentences] = useState<{vi: string, en: string}[]>([])
    const [flashcard, setFlashcard] = useState({ front: "", back: "", index: index })
    const [hasInput, setHasInput] = useState(false)

    useEffect(() => {
        const groups = groupService.getList();
        if (groups[groupIndex] && groups[groupIndex].items) {
            const groupItemSentences = groupService.parseItem(groups[groupIndex].items)
            setSentences(groupItemSentences)
            setFlashcard({ front: groupItemSentences[index].en, back: groupItemSentences[index].vi, index: index })
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

    // const enableTypeInput = () => {
    //     const value = !hasInput
    //     if (value) {
    //         // reverse flashcard
    //         setFlashcard(prev => ({...prev,front: sentences[prev.index].vi, back: sentences[prev.index].en}))
    //     }
    //     setHasInput(value)
    // }

    
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