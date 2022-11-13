import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap"
import { onClickButtonWithSound } from "../common/onClickButtonWithSound";
import { onClickWithSound } from "../common/onClickWithSound";
import './card.scss'


function Card({ front, back, onNext, hasInput = false }: { front: string, back: string, onNext?: () => void, hasInput?: boolean }) {
    const [isBack, setIsBack] = useState(false);
    const [isDisabledNextButton, setIsDisabledNextButton] = useState(true)
    const [input, setInput] = useState("")


    useEffect(() => {
        if(hasInput) {
            setIsBack(true)
            setIsDisabledNextButton(true)
        }        
    }, [hasInput])

    const onClickFlipCard = (_: any) => {
        if (isDisabledNextButton && !hasInput) {
            // enable Next button
            setIsDisabledNextButton(false)
        }

        if (!hasInput) {
            onClickWithSound();
            setIsBack(!isBack);
        }
            
    }
    const onClickNext = () => {
        if (hasInput) {
            setIsBack(true)
        } else {
            setIsBack(false)
        }
        setIsDisabledNextButton(true)
        setInput("")
        onNext && onNext()
    }

    const onChangeInput = (event: any) => {
        const value = event.currentTarget.value
        setInput(value)

        if (hasInput && value.toLowerCase().trim() === front.toLowerCase().trim()) {
            setIsDisabledNextButton(false)
        } else{
            setIsDisabledNextButton(true)
        }
    }

    const onEnter = (e: any) => {
        if (e.key === "Enter") {
            if (!isDisabledNextButton) {
                onClickButtonWithSound()
                onClickNext()
            }
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
                    <Form.Control value={input} onChange={onChangeInput} onKeyDown={onEnter}></Form.Control>
                </div>
            )}


            <div className='d-flex justify-content-center mt-2'>
                <Button variant="primary" onClick={_ => onClickButtonWithSound(() => onClickNext())} disabled={isDisabledNextButton}>
                    Next <i className="bi bi-chevron-right"></i>
                </Button>
            </div>
        </div>
    );
}

export default Card;