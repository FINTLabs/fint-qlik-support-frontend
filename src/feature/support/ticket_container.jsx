import React, {useEffect} from "react";
import {Divider, Grid, Typography} from "@material-ui/core";
import SecondaryOptionsSelector from "../../common/test/SecondaryOptionsSelector";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AutoHideNotification from "../../common/notification/AutoHideNotification";
import Box from "@material-ui/core/Box";
import OutlinedSelector from "./outlined_selector";
import {makeStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import {QLIK} from "../../data/constants/constants";
import {
    initializeTicket,
    updateCategory,
    updateNotifyMessage,
    updateNotifyUser,
    updateSecondaryOptionDisabled,
    updateSecondaryOptionRequired,
    updateSelectedOption,
    updateTicketPriorities,
    updateTicketResponse,
    updateTicketStatusUrl,
    updateTicketSubmitted,
    updateTicketTypes,
    updateTicketValues,
    updateValidForm
} from "../../data/redux/dispatchers/ticket";
import ZenDeskApi from "../../data/api/ZenDeskApi";
import ReactPolling from "react-polling/src/ReactPolling";
import LoadingProgress from "../../common/status/LoadingProgress";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center"
    },
    content: {
        width: "75%"
    },
    ticketForm: {
        border: "1px solid",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        borderColor: theme.palette.grey[400],
    },
    title: {
        paddingLeft: theme.spacing(0),
        paddingBottom: theme.spacing(1)
    },
    component: {
        display: "flex",
    },
    group: {
        marginBottom: theme.spacing(1),
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
    },
    ticketType: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    textField: {},
}));

export default function TicketContainer() {

    const classes = useStyles();
    const values = useSelector(state => state.ticket.values);
    const ticket = useSelector(state => state.ticket);
    const ticketSubmitted = useSelector(state => state.ticket.submitted);
    const message = useSelector(state => state.ticket.message);
    const showNotification = useSelector(state => state.ticket.showNotification);
    const ticketTypes = useSelector(state => state.ticket.types);
    const ticketPriorities = useSelector(state => state.ticket.priorities);
    const shortDescriptionError = useSelector(state => state.ticket.shortDescriptionError);
    const descriptionError = useSelector(state => state.ticket.descriptionError);
    const selectedOption = useSelector(state => state.ticket.values.selectedOption);
    const orgName = useSelector(state => state.ticket.organisationName);
    const meSupportId = useSelector(state => state.ticket.meSupportId);
    const categories = useSelector(state => state.ticket.categories);
    const statusUrl = useSelector(state => state.ticket.statusUrl);
    const response = useSelector(state => state.ticket.response);
    const category = values.category;
    const selectedType = values.selectedType;
    const selectedPriority = values.selectedPriority;
    const shortDescription = values.shortDescription;
    const description = values.description;
    const dispatch = useDispatch();

    useEffect(() => {
        ZenDeskApi.getPriority().then(response =>
            dispatch(updateTicketPriorities(response[1]))
        );
        ZenDeskApi.getType().then(response =>
            dispatch(updateTicketTypes(response[1]))
        );
        ZenDeskApi.getCategory().then(response =>
            dispatch(updateCategory(response[1]))
        );
    }, [dispatch]);

//TODO: We need to get Categories from API
    /*constructor(props) {
        super(props);
        this.state = {
            notify: false,
            notifyMessage: "",
            component: "",
            components: [],
            solution: "kunde-portal",
            shortDescription: "",
            description: "",
            ticketTypes: [],
            ticketPriorities: [],
            ticketType: "question",
            ticketPriority: "low",
            meSupportId: 0,
            ticketSubmitted: false,
            ticketStatusUrl: "",
            newTicket: {},
            formError: false,
            componentError: false,
            descriptionError: false,
            shortDescriptionError: false,
        };
    }*/

    /*clearTicketForm = () => {
        this.setState({
            component: "",
            solution: "kunde-portal",
            shortDescription: "",
            description: "",
            ticketType: "incident",
            ticketPriority: "low",
            meSupportId: 0,
        });
    };*/

    function notify(notify, message) {
        dispatch(updateNotifyUser(notify));
        dispatch(updateNotifyMessage(message));
    }

    function onCloseNotification() {
        /*this.setState({
            notify: false,
            notifyMessage: ""
        });*/
    }

    /*getOrganisationComponents = organisationName => {
        ComponentApi.getOrganisationComponents(organisationName).then(
            ([response, json]) => {
                if (response.status === 200) {
                    this.setState({components: json});
                }
            }
        );
    };

    getTicketType = () => {
        ZenDeskApi.getType().then(([response, json]) => {
            if (response.status === 200) {
                this.setState({ticketTypes: json})
            } else {
                this.notify("Unable to get ticket types.")
            }
        })
    };

    getTicketPriority = () => {
        ZenDeskApi.getPriority().then(([response, json]) => {
            if (response.status === 200) {
                this.setState({ticketPriorities: json})
            } else {
                this.notify("Unable to get ticket priority.")
            }
        })
    };*/

    function createTicket() {
        let tags = [orgName];
        tags.push(category);
        tags.push("vigo-support");
        tags.push(selectedOption);

        return {
            comment: {
                body: description,
            },
            priority: selectedPriority,
            requester_id: meSupportId,
            subject: shortDescription,
            submitter_id: meSupportId,
            tags: [...tags],
            type: selectedType,
        }

    }

    function handleChange(event) {
        let newArray = {...values};

        newArray[event.target.name] = event.target.value;
        dispatch(updateTicketValues(newArray));
        dispatch(updateSecondaryOptionDisabled(event.target.name === "category" && event.target.value !== QLIK));
        dispatch(updateSecondaryOptionRequired((event.target.name !== "category" && category === QLIK) || event.target.value === QLIK));
        if (event.target.name === "category" && event.target.value !== QLIK) {
            dispatch(updateSelectedOption(''));
        }
    }

    function submitTicket() {
        if (isTicketValid()) {
            ZenDeskApi.createTicket(createTicket()).then((response) => {
                if (response.status === 202) {
                    console.log("response.headers.get('location'): ", response.headers.get("location"));
                    dispatch(updateTicketStatusUrl(response.headers.get("location")));
                    dispatch(updateTicketSubmitted(true));
                } else {
                    notify(true, "Oisann, det gikk ikke helt etter planen. Prøv igjen :)");
                }
            });
        } else {
            notify(true, "Alle felter merket med * må fylles ut.");

        }
        /*ZenDeskApi.createTicket(createTicket()).then((response) => {
            if (response.status === 202) {
                dispatch(updateTicketSubmitted(true));
                dispatch(updateTicketStatusUrl(response.headers.get("location")));
            } else {
                notify(true, "Oisann, det gikk ikke helt etter planen. Prøv igjen :)");
            }
        });
    } else {
        notify("Alle felter merket med * må fylles ut.");
    }

    componentDidMount() {
        const {currentOrganisation} = this.props.context;
        this.getOrganisationComponents(currentOrganisation.name);
        this.getTicketType();
        this.getTicketPriority()

        MeApi.getMe().then(([response, json]) => {
            if (response.status === 200) {
                console.log(json);
                this.setState({meSupportId: json.supportId})
            }
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {currentOrganisation} = this.props.context;
        if (prevProps.context !== this.props.context) {
            //this.props.fetchClients(currentOrganisation.name);
            this.getOrganisationComponents(currentOrganisation.name);
        }
    */
    }

    function getHelpText(options, value) {
        if (options.length > 0) {
            return options.filter((o) => o.value === value)[0].help;
        }
    }

    function isTicketValid() {

        let valid = true;
        if (category === QLIK) {
            valid = description && shortDescription && selectedOption;
        } else {
            valid = description && shortDescription;
        }

        validateForm(valid);

        return valid;
    }

    function validateForm(valid) {
        const newArray = {...ticket};
        newArray["formError"] = !valid;
        newArray["descriptionError"] = !description;
        newArray["shortDescriptionError"] = !shortDescription;
        newArray["optionError"] = category === QLIK ? !selectedOption : false;
        dispatch(updateValidForm(newArray));
    }


    function renderSubmitted() {
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
                                        Sak #{response && response.newTicket ? response.newTicket.id : "ukjent saksnummer"} er opprettet
                                    </Typography>
                                    Du vil få en epost med saksdetaljene. Videre oppfølging av saken skjer via epost.
                                </div>
                                <div className={classes.buttons}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            dispatch(initializeTicket());
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
        )
    }


    function renderTicketForm() {
        return (
            <div className={classes.root}>
                <AutoHideNotification
                    showNotification={showNotification}
                    message={message}
                    onClose={onCloseNotification}
                />
                <div className={classes.content}>
                    <Typography variant="h5" className={classes.title}>
                        Opprett ticket
                    </Typography>
                    <Typography variant="body1" className={classes.title}>
                        Våre åpningstider er mandag til fredag 08:00 - 15:30
                    </Typography>
                    <Divider/>
                    <div className={classes.ticketForm}>

                        <RadioGroup
                            aria-label="Gender"
                            name="category"
                            className={classes.group}
                            value={category ? category : categories[0] ? categories[0].name : ''}
                            onChange={handleChange}
                        >
                            {categories.map(category => {
                                if (category.options) {
                                    return (
                                        <div key={category.name} className={classes.component}>
                                            <FormControlLabel value={category.name} control={<Radio/>}
                                                              label={category.name}/>
                                            <SecondaryOptionsSelector options={category.options}/>
                                        </div>
                                    );
                                }
                                return (
                                    <FormControlLabel key={category.name} value={category.name} name="category"
                                                      control={<Radio/>} label={category.name}/>
                                );

                            })}

                        </RadioGroup>

                        <Box borderTop={1} borderBottom={1} pt={1} pb={1} borderColor="grey.400">
                            <Grid container>
                                <Grid item xs={2}>
                                    <OutlinedSelector name={"type"}
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <Box m={2}
                                         dangerouslySetInnerHTML={selectedType ? {__html: getHelpText(ticketTypes, selectedType)} : null}/>
                                </Grid>
                            </Grid>

                            <Box m={2}>
                                <Divider/>
                            </Box>

                            <Grid container>
                                <Grid item xs={2}>
                                    <OutlinedSelector
                                        name={"priority"}
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <Box m={2}
                                         dangerouslySetInnerHTML={selectedPriority ? {__html: getHelpText(ticketPriorities, selectedPriority)} : null}/>
                                </Grid>
                            </Grid>

                        </Box>

                        <TextField
                            id="shortDescription"
                            name="shortDescription"
                            label="Kort beskrivelse"
                            value={shortDescription}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            required
                            error={shortDescriptionError}
                        />
                        <TextField
                            className={classes.textField}
                            id="description"
                            name="description"
                            label="Beskrivelse"
                            value={description}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows={10}
                            fullWidth
                            required
                            error={descriptionError}
                        />
                    </div>
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={submitTicket}
                        >
                            Send inn sak
                        </Button>
                    </div>

                </div>
            </div>
        );
    }

    return (<>{ticketSubmitted ? renderSubmitted() : renderTicketForm()}</>);
}