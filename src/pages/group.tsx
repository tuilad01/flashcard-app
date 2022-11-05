import { Container, Row, Col, Button } from 'react-bootstrap';
import GridData from '../components/grid-data/grid-data';

import './group.scss'

const columns = [
    {
        name: "name",     
        displayName: "Name"   
    },
    {
        name: "description",        
        displayName: "Description"
    },
]

function GroupPage() {
    return (
        <Container>
            <Row>
                <Col>
                    <GridData columns={columns} />
                </Col>
            </Row>
        </Container>
    );
}

export default GroupPage;