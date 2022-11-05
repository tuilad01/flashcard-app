import { Button } from "react-bootstrap"

function Navbar({ pageName }: {pageName: string} ) {
    return (
        <div className='d-flex justify-content-between align-items-center mt-2 mb-4'>
            <Button href="/" variant="primary" onClick={() => console.log("Primary")}>
                <i className="bi bi-arrow-left"></i> Home
            </Button>

            <h1 style={{ "marginBottom": "0" }}>{pageName}</h1>
        </div>
    );
}

export default Navbar;