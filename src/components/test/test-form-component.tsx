import { useState } from "react";
import { Form, Button, Col, Row } from 'react-bootstrap'


function TestForm({ data, onSubmit, onCancel }: { data: any, onSubmit?: (form: any) => void, onCancel?: () => void }) {
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState(data)
        

    const handleSubmit = (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        const formElement = event.currentTarget;
        if (formElement.checkValidity()) {
            if (onSubmit) {
                onSubmit(form)
            }
        }

        setValidated(true);
    };

    const onChangeForm = (event: any) => {

        const name = event.currentTarget.name
        const value = event.currentTarget.value

        setForm({...form, [name]: value})

    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>           
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Id</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="id"
                        value={form.id}
                        onChange={onChangeForm}
                        placeholder="Id"
                    />
                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={onChangeForm}
                        placeholder="Name"
                    />
                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
                </Form.Group>
   
            </Row>
         
            <Button type="submit">Submit form</Button>

            {onCancel && (
                <Button variant="secondary" onClick={() => onCancel()}>
                    Cancel
                </Button>
            )}
        </Form>
    );
}

export default TestForm;