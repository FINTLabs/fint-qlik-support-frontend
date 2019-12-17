import React from 'react';
import TextField from "@material-ui/core/TextField";

const ShortDescription = (props) => {
    const {shortDescription, shortDescriptionError, handleChange} = props;

    return (
        <TextField
            id="shortDescription"
            name="shortDescription"
            label="Kort beskrivelse"
            value={shortDescription}
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