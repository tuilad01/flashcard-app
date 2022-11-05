import { Container, Row, Col } from "react-bootstrap"
import Sidebar from "../components/sidebar/sidebar";

function Dashboard() {
    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-center mt-2 mb-4">Dashboard</h1>
                    <Sidebar />
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;