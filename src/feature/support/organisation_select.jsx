import React from 'react';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {useDispatch, useSelector} from "react-redux";
import {updateOrganisationName} from "../../data/redux/dispatchers/ticket";
import {
    AGDER, COUNTIES,
    INNLANDET,
    MORE_ROMSDAL,
    NORDLAND,
    OSLO,
    ROGALAND,
    TROMS_FINNMARK,
    TRONDELAG,
    VESTFOLD_TELEMARK,
    VESTLAND,
    VIKEN
} from "../../data/constants/constants";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
        minWidth: 150,
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.dark,
                borderStyle: "solid",
                border: "1px",
            },
        },
        '& .MuiFormLabel-root': {
            '&.Mui-focused': {
                color: theme.palette.primary.dark,
            },
        },
    }
}));

const OrganisationSelect = () => {
    const dispatch = useDispatch();
    let organisation = useSelector(state => state.ticket.organisationName);
    const classes = useStyles();
    const title = "Fylke";
    const inputLabel = React.useRef();
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    if (localStorage.getItem("saved") === "true") {
        organisation = localStorage.getItem("organisation");

    }

    function onChange(event) {
        dispatch(updateOrganisationName(event.target.value));
        localStorage.setItem("organisation", event.target.value);
    }

    return (
        <FormControl variant="outlined" className={classes.formControl} required={true}>
            <InputLabel ref={inputLabel} htmlFor={title}>
                {title}
            </InputLabel>
            <Select
                value={organisation}
                onChange={onChange}
                input={<OutlinedInput labelWidth={labelWidth} name={"Organisasjon"} id={"Organisasjon"}/>}
            >
                {COUNTIES.map(entry => {
                    return <MenuItem key={entry.name} value={entry.value}>{entry.name}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
};

export default OrganisationSelect;