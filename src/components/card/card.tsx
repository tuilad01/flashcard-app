import { useState } from "react";
import { Button, Form } from "react-bootstrap"
import { onClickWithSound } from "../common/onClickWithSound";
import './card.scss'


function Card({ front, back, onNext, hasInput = false }: { front: string, back: string, onNext?: () => void, hasInput?: boolean }) {
    const [isBack, setIsBack] = useState(false);
    const [isDisabledNextButton, setIsDisabledNextButton] = useState(true)
    const [input, setInput] = useState("")

    const onClickFlipCard = (_: any) => {
        if (isDisabledNextButton && !hasInput) {
            // enable Next button
            setIsDisabledNextButton(false)
        }

        if (!hasInput)
            setIsBack(!isBack);
    }
    const onClickNext = () => {
        setIsBack(false)
        setIsDisabledNextButton(true)
        setInput("")
        onNext && onNext()
    }

    const onChangeInput = (event: any) => {
        const value = event.currentTarget.value
        setInput(value)

        if (hasInput && value.toLowerCase().trim() === back.toLowerCase().trim()) {
            setIsDisabledNextButton(false)
        } else{
            setIsDisabledNextButton(true)
        }
    }

    const classNames = () => {
        let classes = "card";
        classes += isBack ? " front" : " back";

        return classes;
    }

    return (
        <div>
            <div className={classNames()} onClick={onClickFlipCard}>
                <p>{isBack ? back : front}</p>
            </div>

            {hasInput && (
                <div className="my-1">
                    <Form.Control value={input} onChange={onChangeInput}></Form.Control>
                </div>
            )}


            <div className='d-flex justify-content-center mt-2'>
                <Button variant="primary" onClick={_ => onClickWithSound(() => onClickNext())} disabled={isDisabledNextButton}>
                    Next <i className="bi bi-chevron-right"></i>
                </Button>
            </div>
        </div>
    );
}

export default Card;