import { Container, Row, Col, Button } from 'react-bootstrap';
import GridData from '../components/grid-data/grid-data';
import Navbar from '../components/navbar/navbar';
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
    const pageName = "Group"
    
    return (
        <Container>
            <Row>
                <Col>
                    <Navbar pageName={pageName} />

                    <GridData columns={columns} />
                </Col>
            </Row>
        </Container>
    );
}

export default GroupPage;