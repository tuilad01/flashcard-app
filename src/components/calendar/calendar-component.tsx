import { Container } from "react-bootstrap"

import './calendar-component.scss'
import Month from './month-component';


function Calendar() {
    const now = new Date()


    const onClickDay = (day: Date) => {
        alert(day.toDateString())
    }

    return (
        <Container>
            <Month month={now.getMonth()} year={now.getFullYear()} onClickDay={onClickDay}></Month>

            <Month month={now.getMonth() + 1} year={now.getFullYear()} onClickDay={onClickDay}></Month>
        </Container>
    );
}

export default Calendar;