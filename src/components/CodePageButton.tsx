import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

const CodePageButton = () => {
    return (
        <div>
            <Link to="/code" style={{textDecoration: 'none', color: 'white'}}>
                <Button color="inherit"
                >Enter code</Button>
            </Link>
        </div>
    )
}

export default CodePageButton;
