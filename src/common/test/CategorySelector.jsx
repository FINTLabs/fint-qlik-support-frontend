import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import {makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {updateSelectedOption} from "../../data/redux/dispatchers/ticket";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,

        '& .MuiOutlinedInput-root': {
            '& fieldset': {},
            '&:hover fieldset': {},
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.dark,
                borderStyle: "solid",
                border: "1px",
            },
        },
        '& .MuiFormLabel-root': {
            '& fieldset': {},
            '&:hover fieldset': {},
            '&.Mui-focused': {
                color: theme.palette.primary.dark,
            },
        },

    },
    outlinedInput: {
        secondaryColor: "red",
    },
    component: {
        display: "flex",
    },
    select: {
        '&:before': {
            backgroundColor: "red",
        },
        '&:hover:not(.Mui-disabled):before': {
            backgroundColor: "red",
        }
    },
}));
export default function CategorySelector(props) {

    const classes = useStyles();
    const {cat} = props;
    const value = useSelector(state => state.ticket.values.selectedOption);
    const error = useSelector(state => state.ticket.optionError);
    const category = useSelector(state => state.ticket.values.category);
    const dispatch = useDispatch();
    const name = "options";

    function handleChange(event) {
        dispatch(updateSelectedOption(event.target.value));
    }

    return (

        <div key={cat.name} className={classes.component}>
            <FormControlLabel value={cat.name} control={<Radio/>}
                              label={cat.name}/>
            <FormControl
                disabled={!(cat.options && cat.name === category)}
                variant="outlined"
                required={false}
                className={classes.formControl}
                error={error}
            >
                {cat.options ? <>
                    <InputLabel htmlFor={name}>Alternativ</InputLabel>
                    <Select
                        value={value}
                        onChange={handleChange}
                        input={<OutlinedInput labelWidth={75} className={classes.outlinedInput} name={name}
                                              id={name}/>}
                    >
                        {cat.options ? cat.options.map(option => {
                            return (
                                <MenuItem key={option.dn} value={option.base_path}>
                                    {option.description}
                                </MenuItem>
                            );
                        }) : null}
                    </Select></> : <></>
                }

            </FormControl>
        </div>

    );

}
