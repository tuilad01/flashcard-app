import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { onClickWithSound } from "../common/onClickWithSound";

function Navbar({ pageName }: {pageName: string} ) {
    const navigate = useNavigate();

    return (
        <div className='d-flex justify-content-between align-items-center mt-2 mb-4'>
            {/* <Button as="a" variant="primary" onClick={() => {
                buttonSound.play();
                navigate("/");                
            }}> */}
            <Button as="a" variant="primary" onClick={e => onClickWithSound(() => {
                navigate("/")
            })}>
                <i className="bi bi-arrow-left"></i> Home
            </Button>

            <h1 style={{ "marginBottom": "0" }}>{pageName}</h1>
        </div>
    );
}

export default Navbar;