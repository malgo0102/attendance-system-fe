import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const TeacherStartAttendanceButton = () => {
    return (
        <div>
            <Link to="/start-attendance" style={{textDecoration:'none'}}>
                <Button>Start Attendance</Button>
            </Link>
        </div>

    )
}

export default TeacherStartAttendanceButton;