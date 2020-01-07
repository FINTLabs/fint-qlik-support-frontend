import React from 'react';
import TextField from "@material-ui/core/TextField";
import {useSelector} from "react-redux";

const Description = (props) => {
    const {handleChange} = props;
    const values = useSelector(state=> state.ticket.values);
    const descriptionError = useSelector(state => state.ticket.descriptionError);

    return (
        <TextField
            id="description"
            name="description"
            label="Beskrivelse"
            value={values.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            multiline
            rows={10}
            fullWidth
            required
            error={descriptionError}
            color="secondary"
        />
    );
};

export default Description;