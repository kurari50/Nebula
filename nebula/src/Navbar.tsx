import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div>
            <Link to="/">Home</Link>
            <> / </>
            <Link to="/issues">Issues</Link>
            <> / </>
            <Link to="/ai">AI</Link>
        </div>
    );
}

export default Navbar;
