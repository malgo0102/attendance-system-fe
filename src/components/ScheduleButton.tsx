import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

const ScheduleButton = () => {
    return (
        <div>
            <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
                <Button color="inherit">Schedule</Button>
            </Link>
        </div>

    )
}

export default ScheduleButton
