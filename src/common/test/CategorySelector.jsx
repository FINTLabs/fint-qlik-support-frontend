import React from "react";
import {makeStyles, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,

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
    helpText: {
        marginLeft: theme.spacing(5),
        alignSelf: "center",
    }
}));
export default function CategorySelector(props) {

    const classes = useStyles();
    const {cat} = props;
    const selectedCategory = useSelector(state => state.ticket.values.category);

    return (

        <div key={cat.name} className={classes.component}>
            <FormControlLabel value={cat.name} control={<Radio/>}
                              label={cat.name}/>
            {cat.help && selectedCategory && cat.help.length > 0 && selectedCategory === cat.name ?
                <Typography className={classes.helpText}>- {cat.help}</Typography> : <></>}
        </div>

    );

}
