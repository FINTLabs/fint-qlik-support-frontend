import React from 'react';
import TextField from "@material-ui/core/TextField";
import {Box, Checkbox, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import {updatePersonDataCheckBox} from "../../data/redux/dispatchers/ticket";
import OrganisationSelect from "./organisation_select";

const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: theme.spacing(1),
    },
    nameBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    nameField: {
      marginRight: theme.spacing(2),
    },
    personDataInfo: {

    },
}));

const UserInformation = (props) => {
    const {onChange} = props;
    const values = useSelector(state=> state.ticket.values);
    const firstNameError = useSelector(state => state.ticket.firstNameError);
    const lastNameError = useSelector(state => state.ticket.lastNameError);
    const phoneError = useSelector(state => state.ticket.phoneError);
    const checked = useSelector(state => state.ticket.personDataChecked);
    const mailError = useSelector(state => state.ticket.mailError);
    const organisation = useSelector(state => state.ticket.organisationName);
    const dispatch = useDispatch();
    const classes = useStyles();

    function handleSavePersonData(event) {
        dispatch(updatePersonDataCheckBox(event.target.checked));
        if (event.target.checked){
            localStorage.setItem("saved", "true");
            localStorage.setItem("firstName", values.firstName);
            localStorage.setItem("lastName", values.lastName);
            localStorage.setItem("phone", values.phone);
            localStorage.setItem("mail", values.mail);
            localStorage.setItem("organisation", organisation ? organisation.toString(): null);
        }else{
            localStorage.clear();
        }
    }

    return (
        <div className={classes.container}>
            <OrganisationSelect/>
            <Box className={classes.nameBox}>
            <TextField
                className={classes.nameField}
                id="firstName"
                name="firstName"
                label="Fornavn"
                value={values.firstName || ''}
                onChange={onChange}
                margin="normal"
                variant="outlined"
                fullWidth
                required
                error={firstNameError}
                color="secondary"
            />
            <TextField
                className={classes.nameField}
                id="lastName"
                name="lastName"
                label="Etternavn"
                value={values.lastName || ''}
                onChange={onChange}
                margin="normal"
                variant="outlined"
                fullWidth
                required
                error={lastNameError}
                color="secondary"
            />
            </Box>
            <Box className={classes.nameBox}>
            <TextField
                className={classes.nameField}
                id="phone"
                name="phone"
                label="Mobiltelefonnummer"
                value={values.phone || ''}
                onChange={onChange}
                margin="normal"
                variant="outlined"
                fullWidth
                required
                error={phoneError}
                color="secondary"
            />
            <TextField
                className={classes.nameField}
                id="mail"
                name="mail"
                label="E-postadresse"
                value={values.mail || ''}
                onChange={onChange}
                margin="normal"
                variant="outlined"
                fullWidth
                required
                error={mailError}
                color="secondary"
            />
            </Box>
            <Box className={classes.nameBox}>
                <Typography variant="caption">
                    Lagre mine persondata i nettleseren
                </Typography>
            <Checkbox
                checked={checked}
                onChange={handleSavePersonData}
                value="primary"
                inputProps={{ 'aria-label': 'person-data-checkbox' }}
            />
            </Box>
        </div>
    );
};

export default UserInformation;