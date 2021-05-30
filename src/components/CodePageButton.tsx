import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const CodePageButton = () => {
    return (
        <div>
            <Link to="/code-page" style={{textDecoration:'none'}}>
                <Button>Enter code</Button>
            </Link>
        </div>
    )
}

export default CodePageButton;