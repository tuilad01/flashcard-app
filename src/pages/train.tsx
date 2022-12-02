import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import Card from '../components/card/card';
import Navbar from '../components/navbar/navbar';
import TimerAlert from '../components/timer/timer';
import { onClickButtonWithSound } from '../components/common/onClickButtonWithSound';
import './train.scss'
//import { data } from './trainData';
import { groupService } from '../services/group';
import moment from 'moment';
import Train from '../components/train/train-component';

function TrainPage() {
    const pageName = "Train"
    let index = 0;
    //const [groupData, setGroupData] = useState<[{id: string, name: string, description: string, items: {vi: string, en: string}[]}]>([{ id: "1", name: "test", description: "test", items: [] }])
    const [sentences, setSentences] = useState<{ vi: string, en: string }[]>([])
    const [flashcard, setFlashcard] = useState({ front: "", back: "", index: index })
    const [hasInput, setHasInput] = useState(false)
    const [selectedGroupId, setSelectedGroupId] = useState("")
    const [groups, setGroups] = useState<any[]>([])

    useEffect(() => {
        const localGroups = groupService.getList();
        setGroups(localGroups)

    }, [])


    const onClickNext = () => {
        const nextIndex = flashcard.index > sentences.length - 2 ? 0 : flashcard.index + 1

        // the train process is completed, set a timer for next train
        // if (nextIndex === 0) {
        //     const group = groups.find(gr => gr.id === selectedGroupId)
        //     if (group) {
        //         group.level = group.level && group.level > 1 ? 1 : group.level + 1;
        //         groupService.update(group.id, group)
        //     }
        // }

        // go to next sentence or repeat
        if (nextIndex >= 0) {
            const nextFlashcard = {
                front: sentences[nextIndex].en,
                back: sentences[nextIndex].vi,
                index: nextIndex,
            }

            setFlashcard(nextFlashcard)
        }

    }

    const onSelectGroup = (id: string) => {
        if (!id) return;

        const group = groups.find(gr => gr.id === id)
        if (group) {
            setSelectedGroupId(group.id)
            if (group.items && group.items[0]) {
                // there is a sentence in group
                const groupItemSentences = groupService.parseItem(group.items)
                setSentences(groupItemSentences)
                setFlashcard({ front: groupItemSentences[0].en, back: groupItemSentences[0].vi, index: 0 })
            } else {
                // have no any sentence in group
                alert("Error. There is no vocabulary/sentence in this group.")
            }
        }
    }


    return (
        <Container>
            <Row>
                <Col>
                    <Navbar pageName={pageName} />

                    {selectedGroupId ? (
                        <Train dataSource={sentences.map(s => ({ front: s.en, back: s.vi }))}></Train>
                    ) :
                        (
                            <>
                                {/* <TimerAlert date={moment().add(10, "second").toDate()} /> */}

                                <ListGroup>
                                    {groups.map((gr, index) => (
                                        <ListGroup.Item key={`grItem_${index}`} action onClick={e => onSelectGroup(gr.id)}>
                                            {gr.name}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </>
                        )}

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