import React from 'react';
import {
    clearTicketValues,
    initializeTicket,
    updateTicketResponse,
    updateTicketSubmitted
} from "../../data/redux/dispatchers/ticket";
import LoadingProgress from "../../common/status/LoadingProgress";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ReactPolling from "react-polling/src/ReactPolling";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center"
    },
    content: {
        width: "75%"
    },
    title: {
        paddingLeft: theme.spacing(0),
        paddingBottom: theme.spacing(1)
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
    },
}));


const Submitted = () => {
    const classes = useStyles();
    const statusUrl = useSelector(state => state.ticket.statusUrl);
    const response = useSelector(state => state.ticket.response);
    const dispatch = useDispatch();

    return (
        <ReactPolling
            url={statusUrl}
            interval={2000}
            retryCount={5}
            onSuccess={(response) => {
                dispatch(updateTicketResponse({newTicket: response}));
            }}
            method={'GET'}
            render={({startPolling, stopPolling, isPolling}) => {
                if (isPolling) {
                    return (
                        <LoadingProgress/>
                    );
                } else {
                    return (

                        <div className={classes.root}>
                            <div className={classes.content}>
                                <Typography variant="h5" className={classes.title}>
                                    Sak
                                    #{response && response.newTicket ? response.newTicket.id : "ukjent saksnummer"} er
                                    opprettet
                                </Typography>
                                Du vil få en epost med saksdetaljene. Videre oppfølging av saken skjer via epost.
                            </div>
                            <div className={classes.buttons}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        dispatch(updateTicketSubmitted(false));
                                        dispatch(clearTicketValues())
                                    }}
                                >
                                    Opprett ny sak
                                </Button>
                            </div>
                        </div>
                    );
                }
            }}
        />
    );
};

export default Submitted;