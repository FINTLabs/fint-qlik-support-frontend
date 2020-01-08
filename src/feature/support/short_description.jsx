import React from 'react';
import TextField from "@material-ui/core/TextField";
import {useSelector} from "react-redux";

const ShortDescription = (props) => {
    const {handleChange} = props;
    const values = useSelector(state=> state.ticket.values);
    const shortDescriptionError = useSelector(state => state.ticket.shortDescriptionError);

    return (
        <TextField
            id="shortDescription"
            name="shortDescription"
            label="Kort beskrivelse"
            value={values.shortDescription || ''}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            fullWidth
            required
            error={shortDescriptionError}
            color="secondary"
        />
    );
};

export default ShortDescription;