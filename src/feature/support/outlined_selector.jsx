import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import {makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {updateTicketPriority, updateType} from "../../data/redux/dispatchers/ticket";

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

export default function OutlinedSelector(props) {
    const classes = useStyles();
    const {name} = props;
    const title = name === "type" ? "Velg type" : "Velg prioritet";
    const selectedType = useSelector(state => state.ticket.values.selectedType);
    const selectedPriority = useSelector(state => state.ticket.values.selectedPriority);
    const value = name === "type" ? selectedType : selectedPriority;
    const types = useSelector(state => state.ticket.types);
    const priorities = useSelector(state => state.ticket.priorities);
    const data = name === "type" ? types : priorities;
    const dispatch = useDispatch();
    const disabled = false;

    const inputLabel = React.useRef();
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    function onChange(event) {
        if (name === "type") {
            dispatch(updateType(event.target.value));
        } else {
            dispatch(updateTicketPriority(event.target.value));
        }
    }

    return (
        <FormControl variant="outlined" className={classes.formControl} disabled={disabled}>
            <InputLabel ref={inputLabel} htmlFor={title}>
                {title}
            </InputLabel>
            <Select
                value={value}
                onChange={onChange}
                input={<OutlinedInput labelWidth={labelWidth} name={name} id={name}/>}
            >
                {data.map((type, i) => {
                    return (<MenuItem key={i} value={type.value}>{type.name}</MenuItem>);
                })}

            </Select>
        </FormControl>
    );

}