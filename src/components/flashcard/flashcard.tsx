import { useState } from "react";
import './flashcard.scss'


function Flashcard({ front, back }: { front: string, back: string }) {
    const [isFront, setIsFront] = useState(true);

    const onClick = (_: any) => {
        setIsFront(!isFront)
    }

    const classNames = () => {
        let classes = "flashcard";
        classes += isFront ? " front" : " back";

        return classes;
    }

    return (
        <div>
            <div className={classNames()} onClick={onClick}>
                {isFront ? front : back}
            </div>
        </div>
    );
}

export default Flashcard;