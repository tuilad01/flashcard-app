
import { useEffect, useState } from "react";
import DailyTranslationForm from "../components/daily-translation-form/daily-translation-form";
import { Button, Container, Row, Col } from "react-bootstrap"
import { dailyTranslationService, DailyTranslation } from "../services/daily-translation-service";
import { DailyTranslationSchema } from "../datastore/schemas/daily-translation-schema";
import Calendar from "../components/calendar/calendar-component";
import Month, { compare2Date } from "../components/calendar/month-component";



function DailyTranslationPage() {
    const [listDailyTrans, setListDailyTrans] = useState<DailyTranslation[]>([])
    const [action, setAction] = useState<{ name: "list" | "add" | "edit", dailyTrans?: DailyTranslation, isSubmitable?: boolean }>({ name: "list", isSubmitable: true })

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
            setAction({ name: "edit", dailyTrans: existedDailyTrans })

        } else {
            const addAction : any = { name: "add", isSubmitable: true }
            if (compare2Date(now, day) !== 0) {
                addAction.isSubmitable = false
            }            
            setAction(addAction)
        }
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

                    setListDailyTrans(prev => [...prev, dailyTrans])
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


    const onRendarByAction = () => {
        if (action.name === "add") {
            return <DailyTranslationForm onCancel={onCancel} onSubmit={onSubmit} hasSubmitButton={action.isSubmitable}></DailyTranslationForm>
        } else if (action.name === "edit") {
            return <DailyTranslationForm dailyTranslation={action.dailyTrans} onCancel={onCancel} onSubmit={onSubmit}></DailyTranslationForm>
        }

        return (
            <>
                <h1>Day {countTrainedDaysToNow()}</h1>
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