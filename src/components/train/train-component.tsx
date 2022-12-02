import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap'
import Card from '../card/card';




function Train({ dataSource, onCompleted }: { dataSource: { front: string, back: string }[], onCompleted?: () => void }) {
    const [flashcard, setFlashcard] = useState({ front: dataSource[0].front, back: dataSource[0].back, index: 0 })
    const [hasInput, setHasInput] = useState(false)

    const onClickNext = () => {
        const nextIndex = flashcard.index > dataSource.length - 2 ? 0 : flashcard.index + 1

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
                front: dataSource[nextIndex].front,
                back: dataSource[nextIndex].back,
                index: nextIndex,
            }

            setFlashcard(nextFlashcard)
        }
    }

    return (
        <>
            <Button className="mb-2" variant="danger" onClick={() => setHasInput(!hasInput)}>
                <i className="bi bi-chat-heart"></i> Toggle
            </Button>

            <Card front={flashcard.front} back={flashcard.back} hasInput={hasInput} onNext={onClickNext}></Card>
        </>
    );
}

export default Train;