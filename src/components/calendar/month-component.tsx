import { useState } from 'react';
import './month-component.scss'

const getDaysInMonth = ({ month, year }: { month: number, year: number }) => {
    const daysInMonth = [];

    for (let d = 0; d < 32; d++) {
        const date = new Date(year, month, d + 1)
        if (d > 28 && month !== date.getMonth()) {
            break;
        }

        daysInMonth.push(date)
    }

    return daysInMonth;
}

const getMonthName = (month: number) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return monthNames[month]
}

export const compare2Date = (date1: Date, date2: Date) => {
    date1 = new Date(date1.setHours(0, 0, 0, 0))
    date2 = new Date(date2.setHours(0, 0, 0, 0))

    if (date1.getTime() > date2.getTime()) {
        return 1
    } else if (date1.getTime() < date2.getTime()) {
        return -1
    } else {
        return 0
    }
}

function Month({ month, year, selectedDays, onClickDay }: { month: number, year: number, selectedDays?: Date[], onClickDay?: (day: Date) => void }) {
    const [currentMonth, setCurrentMonth] = useState<{month: number, year: number}>({month: month, year: year})
    const now = new Date()
    const daysInMonth = getDaysInMonth({ month: currentMonth.month, year: currentMonth.year })

    const getDayClassNames = (day: Date) => {
        let classNames = "calendar__month__day"
        const result = compare2Date(day, now)
        if (result === 0) {
            classNames += " calendar__month__day--current"
        } else if (result === -1) {
            classNames += " calendar__month__day--past"
        }

        if (selectedDays && selectedDays.some(d => compare2Date(day, d) === 0)) {
            classNames += " calendar__month__day--selected"
        }

        return classNames
    }

    const _onClickDay = (day: Date) => {
        //alert(day.toDateString())
        if (onClickDay) {
            onClickDay(day);
        }
    }

    const onChangeMonth = (change: number) => {
        const current = new Date(currentMonth.year, currentMonth.month)
        const newMonth = new Date(current.setMonth(current.getMonth() + change))

        setCurrentMonth({month: newMonth.getMonth(), year: newMonth.getFullYear()})
    }

    return (
        <div className='calendar__month'>
            <div className='calendar__month__header'>
                <div>
                    <i className="bi bi-caret-left clickable" onClick={() => onChangeMonth(-1)}></i>
                </div>
                <div className='calendar__month__name'>
                    {getMonthName(currentMonth.month)} - {currentMonth.year}
                </div>
                <div>
                    <i className="bi bi-caret-right clickable" onClick={() => onChangeMonth(1)}></i>
                </div>
            </div>
            <div className='calendar__month__days'>
                {daysInMonth.map((day: any, index: number) => {
                    return (
                        <div key={`calDate_${index}`} onClick={() => _onClickDay(day)} className={getDayClassNames(day)}>{day.getDate()}</div>
                    )
                })}
            </div>
        </div>
    );
}

export default Month;