
import { useEffect, useState } from "react";
import DailyTranslationForm from "../components/daily-translation-form/daily-translation-form";
import { Button, Container, Row, Col } from "react-bootstrap"
import { dailyTranslationService, DailyTranslation } from "../services/daily-translation-service";
import { DailyTranslationSchema } from "../datastore/schemas/daily-translation-schema";
import Calendar from "../components/calendar/calendar-component";
import Month, { compare2Date } from "../components/calendar/month-component";
import Train from "../components/train/train-component";



function DailyTranslationPage() {
    const [listDailyTrans, setListDailyTrans] = useState<DailyTranslation[]>([])
    const [action, setAction] = useState<{ name: "list" | "add" | "edit" | "train", selectedDailyTrans?: DailyTranslation, isSubmitable?: boolean }>({ name: "list", isSubmitable: true })
    const [selectingDateForPracticing, setSelectingDateForPracticing] = useState<{ value: boolean }>({ value: false })

    const now = new Date();

    useEffect(() => {
        dailyTranslationService.getAll({}).then(list => {
            setListDailyTrans(list)
        })
    }, [])

    // const onAdd = () => {
    //     const dailyTrans = new DailyTranslation();
    //     dailyTrans.vi = "xin chao"
    //     dailyTrans.myself = "hello"
    //     dailyTrans.google = "hi"
    //     dailyTranslationService.add(dailyTrans).then((newDailyTrans: DailyTranslation) => {
    //         if (newDailyTrans.id) {
    //             alert("add succesfully")
    //         }
    //     })
    // }

    // const onUpdate = () => {
    //     const dailyTrans = new DailyTranslation();
    //     dailyTrans.vi = "xin chao000000"
    //     dailyTrans.myself = "hello0000000"
    //     dailyTrans.google = "hi"
    //     dailyTranslationService.update("35e0c2ea-4e75-4950-8cad-6c1119973ad7", dailyTrans).then(result => {
    //         if (result) {
    //             alert("update succesfully")
    //         }
    //     })
    // }

    // const onGetAll = () => {
    //     dailyTranslationService.getAll({}).then(list => {
    //         console.log(list)
    //     })
    // }
    // const onGetOne = () => {

    // }

    const onClickDay = (day: Date) => {
        
        const existedDailyTrans = listDailyTrans.find(d => d.createdAt && compare2Date(d.createdAt, day) === 0)
        if (existedDailyTrans?.id) {
            // is for practicng or not
            if (selectingDateForPracticing.value) {
                setAction({ name: "train", selectedDailyTrans: existedDailyTrans })
            } else {
                setAction({ name: "edit", selectedDailyTrans: existedDailyTrans })
            }
        } else {
            const addAction: any = { name: "add", isSubmitable: true }
            if (compare2Date(now, day) !== 0) {
                addAction.isSubmitable = false
            }
            setAction(addAction)

        }
        setSelectingDateForPracticing({ value: false })
    }

    const onCancel = () => {
        setAction({ name: "list" })
    }

    const onSubmit = (form: any) => {
        if (form.id) {
            // update
            dailyTranslationService.update(form.id, form).then(dailyTrans => {
                if (dailyTrans.id) {
                    const dt = listDailyTrans.find(d => d.id === dailyTrans.id)
                    if (dt) {
                        dt.vi = dailyTrans.vi
                        dt.myself = dailyTrans.myself
                        dt.google = dailyTrans.google
                        dt.conclude = dailyTrans.conclude
                        dt.updatedAt = dailyTrans.updatedAt
                    }

                    setListDailyTrans([...listDailyTrans])
                    alert("update succesfully");
                }
            })
        } else {
            // add

            dailyTranslationService.add(form).then(dailyTrans => {
                if (dailyTrans.id) {
                    setListDailyTrans(prev => [...prev, dailyTrans])
                    setAction({ name: "list" })
                }
            })
        }
    }
    const countTrainedDaysToNow = (): number => {
        //return listDailyTrans.filter(dt => dt.myself && dt.createdAt && dt.createdAt.getTime() < Date.now()).length
        return listDailyTrans.length
    }

    const onToggleTrain = () => {
        setSelectingDateForPracticing({ value: !selectingDateForPracticing.value })
    }


    const onRendarByAction = () => {
        if (action.name === "add") {
            return <DailyTranslationForm onCancel={onCancel} onSubmit={onSubmit} hasSubmitButton={action.isSubmitable}></DailyTranslationForm>
        } else if (action.name === "edit") {
            return <DailyTranslationForm dailyTranslation={action.selectedDailyTrans} onCancel={onCancel} onSubmit={onSubmit}></DailyTranslationForm>
        } else if (action.name === "train") {
            let data = []
            if (action.selectedDailyTrans?.conclude) {
                const lines = action.selectedDailyTrans.conclude.split("\n")
                const data = lines.map(line => {
                    const conclude = line.split("|")
                    const front = conclude[0]?.trim()
                    const back = conclude[1]?.trim()
                    return {
                        front: front,
                        back: back
                    }

                });

                return (
                    <>
                        <Button variant="primary" onClick={() => setAction({ name: "list" })}>
                            Back to month
                        </Button>

                        <div className="mt-2">
                            <Train dataSource={data}></Train>
                        </div>
                    </>
                )
            }

        }

        return (
            <>
                <h1>Day {countTrainedDaysToNow()}</h1>
                <div className="d-flex">
                    <Button variant={selectingDateForPracticing.value ? "danger" : "primary"} onClick={() => onToggleTrain()}>
                        Practice
                    </Button>

                    <span className="ml-3 mt-2">{selectingDateForPracticing.value ? "Please select a day" : ""}</span>
                </div>


                <Month month={now.getMonth()} year={now.getFullYear()} onClickDay={onClickDay}></Month>
            </>
        )
    }

    return (
        <Container>
            <Row>
                <Col>
                    <div className="mt-5">
                        {onRendarByAction()}
                    </div>
                </Col>
            </Row>
        </Container>

    );
}

export default DailyTranslationPage;