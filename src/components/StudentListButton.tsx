import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const StudentListButton = () => {
  return (
    <div>
      <Link to="/student-list" style={{textDecoration:'none'}}>
        <Button>Student List</Button>
      </Link>
    </div>

  )
}

export default StudentListButton;