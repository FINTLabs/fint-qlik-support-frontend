import React, {useEffect} from "react";
import {Divider, Typography} from "@material-ui/core";
import CategorySelector from "../../common/test/CategorySelector";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "@material-ui/core/Button";
import AutoHideNotification from "../../common/notification/AutoHideNotification";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import {QLIK} from "../../data/constants/constants";
import {
    updateCategory,
    updateNotifyMessage,
    updateNotifyUser,
    updateSecondaryOptionDisabled,
    updateSecondaryOptionRequired,
    updateSelectedOption,
    updateTicketPriorities,
    updateTicketStatusUrl,
    updateTicketSubmitted,
    updateTicketTypes,
    updateTicketValues,
    updateValidForm
} from "../../data/redux/dispatchers/ticket";
import ZenDeskApi from "../../data/api/ZenDeskApi";
import Description from "./description";
import ShortDescription from "./short_description";
import TypeSelection from "./type_selection";
import PrioritySelection from "./priority_selection";
import Submitted from "./submitted";

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
    selectionBox: {
        borderStyle: "solid",
        border: "1px",
        borderLeft: 0,
        borderRight: 0,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        borderColor: "darkgrey",
    },
}));

export default function TicketContainer() {

    const classes = useStyles();
    const values = useSelector(state => state.ticket.values);
    const ticket = useSelector(state => state.ticket);
    const ticketSubmitted = useSelector(state => state.ticket.submitted);
    const message = useSelector(state => state.ticket.message);
    const showNotification = useSelector(state => state.ticket.showNotification);
    const shortDescriptionError = useSelector(state => state.ticket.shortDescriptionError);
    const descriptionError = useSelector(state => state.ticket.descriptionError);
    const selectedOption = useSelector(state => state.ticket.values.selectedOption);
    const orgName = useSelector(state => state.ticket.organisationName);
    const meSupportId = useSelector(state => state.ticket.meSupportId);
    const categories = useSelector(state => state.ticket.categories);
    const disabled = useSelector(state => state.ticket.optionDisabled);
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
            ZenDeskApi.getCategory().then(response => {
                    dispatch(updateCategory(response[1]));
                }
            );
        },
        [dispatch]);

    /*constructor(props) {
        super(props);
        this.state = {
            meSupportId: 0,
        };
    }*/

    function notify(notify, message) {
        dispatch(updateNotifyUser(notify));
        dispatch(updateNotifyMessage(message));
    }

    function onCloseNotification() {
        dispatch(updateNotifyUser(false));
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
     */
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

        if (event.target.name === "category") {
            const newArray = {...disabled};
            categories.map(cat => {
                newArray[cat.name] = cat.name === event.target.value;
                return null;
            });
            dispatch(updateSelectedOption(''));
            dispatch(updateSecondaryOptionDisabled(newArray));
            dispatch(updateSecondaryOptionRequired(newArray));
        }
    }

    function submitTicket() {
        if (isTicketValid()) {
            ZenDeskApi.createTicket(createTicket()).then((response) => {
                if (response.status === 202) {
                    dispatch(updateTicketStatusUrl(response.headers.get("location")));
                    dispatch(updateTicketSubmitted(true));
                } else {
                    notify(true, "Oisann, det gikk ikke helt etter planen. Prøv igjen :)");
                }
            });
        } else {
            notify(true, "Alle felter merket med * må fylles ut.");

        }
        /*
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
                            {categories.map(cat => {
                                return (
                                    <CategorySelector key={cat.name} cat={cat}/>
                                );
                            })}
                        </RadioGroup>
                        <Box className={classes.selectionBox}>
                            <TypeSelection/>
                            <Box m={2}>
                                <Divider/>
                            </Box>
                            <PrioritySelection/>
                        </Box>
                        <ShortDescription
                            shortDescription={shortDescription}
                            shortDescriptionError={shortDescriptionError}
                            handleChange={handleChange}
                        />
                        <Description
                            description={description}
                            descriptionError={descriptionError}
                            handleChange={handleChange}
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

    return (<>{ticketSubmitted ? <Submitted/> : renderTicketForm()}</>);
}