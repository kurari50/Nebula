import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div>
      <Link to="/">Home</Link>
      <> / </>
      <Link to="/issues">Issues</Link>
    </div>
  );
}

export default Navbar;
