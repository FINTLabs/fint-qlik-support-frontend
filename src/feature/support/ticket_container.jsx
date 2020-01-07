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
    updateCategories,
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
import UserInformation from "./user_information";

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
    const orgName = useSelector(state => state.ticket.organisationName);
    const meSupportId = useSelector(state => state.ticket.meSupportId);
    const categories = useSelector(state => state.ticket.categories);
    const disabled = useSelector(state => state.ticket.optionDisabled);
    const personDataCheckBoxChecked = useSelector(state => state.ticket.personDataChecked);
    const dispatch = useDispatch();

    useEffect(() => {
            ZenDeskApi.getPriority().then(response =>
                dispatch(updateTicketPriorities(response[1]))
            );
            ZenDeskApi.getType().then(response =>
                dispatch(updateTicketTypes(response[1]))
            );
            ZenDeskApi.getCategory().then(response => {
                    dispatch(updateCategories(response[1]));
                }
            );
            console.log("localStorage: ", localStorage.getItem("firstName"), localStorage.getItem("lastName"), localStorage.getItem("phone"), localStorage.getItem("mail"));
            if (localStorage.getItem("saved") === "true"){
                let newArray = {...values};
                newArray["firstName"] = localStorage.getItem("firstName");
                newArray["lastName"] = localStorage.getItem("lastName");
                newArray["phone"] = localStorage.getItem("phone");
                newArray["mail"] = localStorage.getItem("mail");
                dispatch(updateTicketValues(newArray));
            }
        },
        [dispatch, localStorage]);

    function notify(notify, message) {
        dispatch(updateNotifyUser(notify));
        dispatch(updateNotifyMessage(message));
    }

    function onCloseNotification() {
        dispatch(updateNotifyUser(false));
    }

    function createTicket() {
        let tags = [orgName];
        tags.push(values.category);
        tags.push("vigo-support");
        tags.push(values.category === QLIK ? values.selectedOption : null);

        return {
            comment: {
                body: values.description,
            },
            priority: values.selectedPriority,
            requester_id: meSupportId,
            subject: values.shortDescription,
            submitter_id: meSupportId,
            tags: [...tags],
            type: values.selectedType,
        }
    }

    function handleChange(event) {
        if (personDataCheckBoxChecked){
            localStorage.setItem("firstName", values.firstName);
            localStorage.setItem("lastName", values.lastName);
            localStorage.setItem("phone", values.phone);
            localStorage.setItem("mail", values.mail);
        }
        let newArray = {...values};

        newArray[event.target.name] = event.target.value;
        dispatch(updateTicketValues(newArray));

        if (event.target.name === "category") {
            const newArray = {...disabled};
            categories.map(cat => {
                newArray[cat.name] = cat.name === event.target.value;
                return null;
            });
            dispatch(updateSelectedOption(null));
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
    }

    function isTicketValid() {
        const valid = isOptionsSelected() && isTextFieldsFilled();

        updateValidFormValues(valid);

        return valid;
    }

    function isTextFieldsFilled() {
        return values.description &&
            values.shortDescription &&
            values.firstName &&
            values.lastName &&
            values.phone &&
            values.mail;
    }

    function isOptionsSelected() {
        let validOptions =
            values.selectedPriority &&
            values.selectedType &&
            values.category;
        return values.category === QLIK ? values.selectedOption && validOptions : values.selectedOption;
    }

    function updateValidFormValues(valid) {
        const newArray = {...ticket};
        newArray["formError"] = !valid;
        newArray["optionError"] = values.category === QLIK ? !values.selectedOption : false;
        newArray["descriptionError"] = !values.description;
        newArray["shortDescriptionError"] = !values.shortDescription;
        newArray["firstNameError"] = !values.firstName;
        newArray["lastNameError"] = !values.lastName;
        newArray["phoneError"] = !values.phone;
        newArray["mailError"] = !values.mail;
        newArray["typeError"] = !values.selectedType;
        newArray["priorityError"] = !values.selectedPriority;
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
                        <UserInformation
                            onChange={handleChange}
                        />
                        <Divider/>
                        <RadioGroup
                            aria-label="Gender"
                            name="category"
                            className={classes.group}
                            value={values.category}
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
                            handleChange={handleChange}
                        />
                        <Description
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