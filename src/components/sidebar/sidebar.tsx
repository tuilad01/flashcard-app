import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function Sidebar() {
    return (
        <Nav defaultActiveKey="/" className="flex-column text-center">
            <Nav.Link as={Link} to="/group">Group</Nav.Link>
            <Nav.Link as={Link} to="/train">Train</Nav.Link>
            <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
            <Nav.Link as={Link} to="/daily-translation">Daily translation</Nav.Link>
            <Nav.Link as={Link} to="/test">Test</Nav.Link>
            <Nav.Link as={Link} to="/import">Import</Nav.Link>
            {/* <Nav.Link as={Link} to="/upload">Upload</Nav.Link> */}
            

            {/* <Nav.Link eventKey="link-1">Link</Nav.Link>
            <Nav.Link eventKey="link-2">Link</Nav.Link>
            <Nav.Link eventKey="disabled" disabled>
                Disabled
            </Nav.Link> */}
        </Nav>
    );
}

export default Sidebar;