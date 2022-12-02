import { AnySoaRecord } from "dns";
import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { DailyTranslation } from "../../services/daily-translation-service";

const defaultValue: DailyTranslation = {
    id: "",
    vi: "",
    myself: "",
    google: "",
    conclude: ""
}

function DailyTranslationForm({ dailyTranslation, onSubmit, onCancel, hasSubmitButton = true }: { dailyTranslation?: DailyTranslation, onSubmit?: (form: any) => void, onCancel?: () => void, hasSubmitButton?: boolean }) {
    const [form, setForm] = useState<{ [key: string]: any }>(dailyTranslation || defaultValue)
    const [validated, setValidated] = useState(false)

    const onSubmitForm = (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        const formElement = event.currentTarget;
        if (formElement.checkValidity()) {
            if (onSubmit) {
                onSubmit(form)
            }
        }

        setValidated(true);

    }

    const onChangeForm = (event: any) => {
        const name = event.currentTarget.name
        const value = event.currentTarget.value
        console.log()
        setForm({ ...form, [name]: value })
    }

    const onCancelForm = () => {
        if (onCancel) {
            onCancel()
        }
    }


    return (
        <Form noValidate validated={validated} onSubmit={onSubmitForm}>
            <input type="hidden" name="id" value={form.id}></input>
            <Form.Group className="mb-3" >
                <Form.Label>Vi</Form.Label>
                <Form.Control required as="textarea" rows={5} type="text" name="vi" value={form.vi} onChange={onChangeForm} placeholder="Vi text..." />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Myself</Form.Label>
                <Form.Control as="textarea" rows={5} type="text" name="myself" value={form.myself} onChange={onChangeForm} placeholder="myself..." />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Google</Form.Label>
                <Form.Control as="textarea" rows={5} type="text" name="google" value={form.google} onChange={onChangeForm} placeholder="google..." />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Conclude</Form.Label>
                <Form.Control as="textarea" rows={5} type="text" name="conclude" value={form.conclude} onChange={onChangeForm} placeholder="conclude..." />
            </Form.Group>

            {hasSubmitButton &&
                <Button variant="primary" type="submit">
                    {form?.id ? "Update" : "Submit"}
                </Button>
            }

            <Button variant="secondary" className="ml-1" onClick={() => onCancelForm()}>
                Cancel
            </Button>
        </Form>
    );
}

export default DailyTranslationForm;