import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {AttendanceProgress} from "../type";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';


export function PresentStudentsListDialog({studentsList}: { studentsList: AttendanceProgress }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{marginLeft: '16px'}}>
                Details
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Students List"}</DialogTitle>
                <DialogContent>
                    <List component="nav" aria-label="main mailbox folders">
                        {studentsList.map(student => (
                            <ListItem button key={student.id}>
                                <ListItemIcon color={student.isPresent ? "red" : "warning"}>
                                    {
                                        student.isPresent ?
                                            <CheckIcon/> : <ClearIcon/>
                                    }
                                </ListItemIcon>
                                <ListItemText
                                    primary={student.firstName && student.lastName ? `${student.firstName} ${student.lastName}` : ""}/>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
