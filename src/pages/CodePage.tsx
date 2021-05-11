import React, { useState } from "react";
import {
    Button,
    TextField,
    Grid,
    Paper,
    Typography
} from "@material-ui/core";
import './codepage.css';
import keabird from "./keabird.png";


const CodePage = () => {
    const [code, setCode] = useState("");

    return (
        <div>
            <Grid container direction="row" justify="center">
                <Grid item>
                    <Grid container spacing={0} alignItems="center" direction="row">
                        <Grid container direction="column" spacing={2} className="codepage-form">
                            <Paper variant="elevation" elevation={2} className="codepage-background">
                                <Grid item>
                                    <Typography component="h1" variant="h5">Sign in</Typography>
                                </Grid>
                                <Grid item>
                                    <form>
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item>
                                                <TextField type="code" placeholder="Code" fullWidth name="code" variant="outlined"
                                                           value={ code } onChange={(event) => setCode(event.target.value)} required />
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" color="default" type="submit" className="button-block">Submit</Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <img src={keabird} height={300} alt="kea bird" className="keabird-img" />
                </Grid>
            </Grid>
        </div>
    );
}

export default CodePage;