import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import {makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {updateSelectedOption} from "../../data/redux/dispatchers/ticket";


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));
export default function SecondaryOptionsSelector(props) {

    const classes = useStyles();
    const {options} = props;
    const disabled = useSelector(state => state.ticket.optionDisabled);
    const required = useSelector(state => state.ticket.secondaryOptionsRequired);
    const value = useSelector(state => state.ticket.values.selectedOption);
    const error = useSelector(state => state.ticket.optionError);
    const dispatch = useDispatch();
    const name = "options";

    const inputLabel = React.useRef();
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    function handleChange(event) {
        dispatch(updateSelectedOption(event.target.value));
    }

    return (
        <FormControl
            disabled={disabled}
            variant="outlined"
            fullWidth
            required={required}
            className={classes.formControl}
            error={error}
        >
            <InputLabel ref={inputLabel} htmlFor={name}>Alternativ</InputLabel>
            <Select

                value={value}
                onChange={handleChange}
                input={<OutlinedInput labelWidth={labelWidth} name={name} id={name}/>}
            >
                {options ? options.map(option => {
                    return (
                        <MenuItem key={option.dn} value={option.base_path}>
                            {option.description}
                        </MenuItem>
                    );
                }) : null}
            </Select>
        </FormControl>

    );

}
