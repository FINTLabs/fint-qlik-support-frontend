import React from "react";
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
import {ANALYSE, HUB, NPRINTING, QLIK} from "../../data/constants/constants";
import {updateSelectedCategory, updateTicketPriority, updateTicketValues} from "../../data/redux/dispatchers/ticket";

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
}));

export default function TicketContainer() {

    const classes = useStyles();
    const values = useSelector(state => state.ticket.values);
    const ticketSubmitted = useSelector(state => state.ticket.submitted);
    const message = useSelector(state => state.ticket.message);
    const showNotification = useSelector(state => state.ticket.showNotification);
    const optionError = useSelector(state => state.ticket.optionError);
    const secondaryOptions = useSelector(state => state.ticket.secondaryOptions);
    const ticketTypes = useSelector(state => state.ticket.types);
    const ticketPriorities = useSelector(state => state.ticket.priorities);
    const shortDescriptionError = useSelector(state => state.ticket.shortDescriptionError);
    const descriptionError = useSelector(state => state.ticket.descriptionError);
    const category = values.category;
    const optionSelected = values.selectedOption;
    const selectedType = values.selectedType;
    const selectedPriority = values.selectedPriority;
    const shortDescription = values.shortDescription;
    const description = values.description;
    const optionDisabled = values.optionDisabled;
    const dispatch = useDispatch();


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

    /*notify = message => {
        this.setState({
            notify: true,
            notifyMessage: message
        });
    };*/

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

    /*getTicket = () => {
        const {currentOrganisation} = this.props.context;
        let tags = [currentOrganisation.name];
        tags.push(this.state.solution);
        if (this.state.solution === "felleskomponent") {
            tags.push(this.state.component)
        }


        return {
            comment: {
                body: this.state.description
            },
            priority: this.state.ticketPriority,
            requester_id: this.state.meSupportId,
            subject: this.state.shortDescription,
            submitter_id: this.state.meSupportId,
            tags: [...tags],
            type: this.state.ticketType
        }

    };*/

    function submitTicket() {
        if (isTicketValid()) {
            /*ZenDeskApi.createTicket(this.getTicket()).then((response) => {
                if (response.status === 202) {
                    this.setState(
                        {
                            ticketStatusUrl: response.headers.get("location"), ticketSubmitted: true,
                        }
                    );
                } else {
                    this.notify("Oisann, det gikk ikke helt etter planen. Prøv igjen :)")
                }
            });
        } else {
            this.notify("Alle felter merket med * må fylles ut.");
        }*/
        }

        /*componentDidMount() {
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

    function handleChange(event) {
        let newArray = {...values};

        newArray[event.target.name] = event.target.value;
        if (event.target.value === "Spørsmål") {
            dispatch(updateTicketPriority("low"));
        }
        console.log(newArray);
        dispatch(updateTicketValues(newArray));
    }


    //TODO: Can combine the to getHelpText functions
    function getTicketTypeHelpText(type) {
        if (ticketTypes.length > 0) {
            return ticketTypes.filter((o) => o.value === type)[0].help;
        }
    }

    function getTicketPriorityHelpText(type) {
        if (ticketPriorities.length > 0) {
            return ticketPriorities.filter((o) => o.value === type)[0].help;
        }
    }

    function disableComponentSelect() {
        return this.state.solution !== "felleskomponent";
    };

    function isTicketValid() {

        let valid = true;
        /*if (this.state.solution === "felleskomponent") {
            valid = this.state.description && this.state.shortDescription && this.state.component;
        } else {
            valid = this.state.description && this.state.shortDescription;
        }*/

        validateForm(valid);

        return valid;
    }

    function validateForm(valid) {
        /*this.setState({
            formError: !valid,
            descriptionError: !this.state.description,
            shortDescriptionError: !this.state.shortDescription,
            componentError: this.state.solution === "felleskomponent" ? !this.state.component : false
        });*/
    }


    function renderSubmitted() {
        return (<div></div>/*
            <ReactPolling
                url={this.state.ticketStatusUrl}
                interval={2000}
                retryCount={5}
                onSuccess={(response) => this.setState({newTicket: response})}
                method={'GET'}
                render={({startPolling, stopPolling, isPolling}) => {
                    if (isPolling) {
                        return (
                            <LoadingProgress/>
                        );
                    } else {
                        const {classes} = this.props;
                        return (
                            <div className={classes.root}>
                                <div className={classes.content}>
                                    <Typography variant="h5" className={classes.title}>
                                        Sak #{this.state.newTicket.id} er opprettet
                                    </Typography>
                                    Du vil få en epost med saksdetaljene. Videre oppfølging av saken skjer via epost.
                                </div>
                                <div className={classes.buttons}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            this.setState({ticketSubmitted: false});
                                            this.clearTicketForm();
                                        }}
                                    >
                                        Opprett ny sak
                                    </Button>
                                </div>
                            </div>
                        );
                    }
                }}
            />*/
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
                            value={category}
                            onChange={handleChange}
                        >
                            <div className={classes.component}>
                                <FormControlLabel value={QLIK} control={<Radio/>} label={QLIK}/>
                                <SecondaryOptionsSelector
                                    disabled={optionDisabled}
                                    options={secondaryOptions}
                                    handleChange={handleChange}
                                    name={"options"}
                                    value={optionSelected}
                                    required={category.toString() === QLIK} // TODO: What if other Categories produce secondaryOptions
                                    error={optionError}
                                />
                            </div>
                            <FormControlLabel value={HUB} control={<Radio/>} label={HUB}/>
                            <FormControlLabel value={NPRINTING} control={<Radio/>} label={NPRINTING}/>
                            <FormControlLabel value={ANALYSE} control={<Radio/>} label={ANALYSE}/>


                        </RadioGroup>

                        <Box borderTop={1} borderBottom={1} pt={1} pb={1} borderColor="grey.400">
                            <Grid container>
                                <Grid item xs={2}>
                                    <OutlinedSelector
                                        data={ticketTypes}
                                        value={selectedType}
                                        onChange={handleChange}
                                        title="Velg type"
                                        name="ticketType"
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <Box m={2}
                                         dangerouslySetInnerHTML={selectedType ? {__html: this.getTicketTypeHelpText(selectedType)}:null}/>
                                </Grid>
                            </Grid>

                            <Box m={2}>
                                <Divider/>
                            </Box>

                            <Grid container>
                                <Grid item xs={2}>
                                    <OutlinedSelector
                                        data={ticketPriorities}
                                        value={selectedPriority}
                                        onChange={handleChange}
                                        title="Velg prioritet"
                                        name="ticketPriority"
                                        disabled={selectedType === "Spørsmål"}
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <Box m={2}
                                         dangerouslySetInnerHTML={selectedPriority ? {__html: this.getTicketPriorityHelpText(selectedPriority)}: null}/>
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