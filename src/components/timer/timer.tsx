import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap"
import moment from "moment"
let intervalTimer: any = null;
function TimerAlert({ date }: { date: Date }) {
    const [time, setTime] = useState<Date>(date)
    const [isDone, setIsDone] = useState(false)
    useEffect(() => {

        intervalTimer = setInterval(function () {
            if (time.getTime() <= Date.now()) {
                setIsDone(true)
                clearInterval(intervalTimer)
            } else {                
                setTime(prev => {
                    const nextTime = moment(prev).add(-1, "second").toDate()
                    return nextTime 
                });
            }            
        }, 1000)

        return () => intervalTimer && clearInterval(intervalTimer)
    }, [])
    return (
        <Alert variant={"primary"}>
            {isDone ? "Done" : time.toLocaleString()}
        </Alert>
    );
}

export default TimerAlert;