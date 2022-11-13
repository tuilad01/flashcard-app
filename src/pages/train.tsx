import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
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
    const [sentences, setSentences] = useState<{ vi: string, en: string }[]>([])
    const [flashcard, setFlashcard] = useState({ front: "", back: "", index: index })
    const [hasInput, setHasInput] = useState(false)
    const [selectedGroupId, setSelectedGroupId] = useState("")
    const [groups, setGroups] = useState<any[]>([])

    useEffect(() => {
        const localGroups = groupService.getList();
        setGroups(localGroups)
        // if (selectedGroupId) {
        //     const group = localGroups.find(gr => gr.id === selectedGroupId)

        // }
        // const group = 
        // if (local) {
        //     const groupItemSentences = groupService.parseItem(localGroups[groupIndex].items)
        //     setSentences(groupItemSentences)
        //     setFlashcard({ front: groupItemSentences[index].en, back: groupItemSentences[index].vi, index: index })
        // }

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
                return { ...prev }
            }
        })
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
                        <>
                            <Button className="mb-2" variant="danger" onClick={() => onClickButtonWithSound(() => setHasInput(!hasInput))}>
                                <i className="bi bi-chat-heart"></i> Toggle
                            </Button>

                            <Card front={flashcard.front} back={flashcard.back} hasInput={hasInput} onNext={onClickNext}></Card>
                        </>
                    ) :
                        (
                            <>
                                <ListGroup>
                                    {groups.map(gr => (
                                        <ListGroup.Item action onClick={e => onSelectGroup(gr.id)}>
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