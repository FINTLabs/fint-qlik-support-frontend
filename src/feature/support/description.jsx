import React from 'react';
import TextField from "@material-ui/core/TextField";

const Description = (props) => {
    const {description, descriptionError, handleChange} = props;

    return (
        <TextField
            id="description"
            name="description"
            label="Beskrivelse"
            value={description}
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