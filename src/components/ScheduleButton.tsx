import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const ScheduleButton = () => {
  return (
    <div>
       <Link to="/student-schedule" style={{textDecoration:'none'}}>
         <Button>Schedule</Button>
      </Link>
    </div>
   
  )
}

export default ScheduleButton
