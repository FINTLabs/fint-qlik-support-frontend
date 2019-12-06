import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import {makeStyles} from "@material-ui/core";
import PropTypes from "prop-types";


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));
export default function SecondaryOptionsSelector(props) {

    const classes = useStyles();
    const {name, value, options, disabled, required, error = false} = props;

    const inputLabel = React.useRef();
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

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
                onChange={props.handleChange}
                input={<OutlinedInput labelWidth={labelWidth} name={name} id={name}/>}
            >
                {options ? options.map(option => {
                    return (
                        <MenuItem key={option.dn} value={option.basePath}>
                            {option.description}
                        </MenuItem>
                    );
                }) : null}
            </Select>
        </FormControl>

    );

}


SecondaryOptionsSelector.defaultProps = {
    disabled: false,
    required: true
};
SecondaryOptionsSelector.propTypes = {
    classes: PropTypes.any,
    options: PropTypes.any.isRequired,
    handleChange: PropTypes.any.isRequired,
    name: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    disabled: PropTypes.bool.isRequired,
    required: PropTypes.bool.isRequired,
};
