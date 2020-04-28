import React from 'react';
import {Grid} from "@material-ui/core";
import OutlinedSelector from "./outlined_selector";
import Box from "@material-ui/core/Box";
import {useSelector} from "react-redux";

const TypeSelection = () => {
    const selectedType = useSelector(state => state.ticket.values.selectedType);
    const ticketTypes = useSelector(state => state.ticket.types);

    function getHelpText(options, value) {
        if (options.length > 0) {
            return options.filter((o) => o.value === value)[0].help;
        }
    }

    return (
        <Grid container>
            <Grid item xs={2}>
                <OutlinedSelector name={"type"}
                />
            </Grid>
            <Grid item xs={10}>
                <Box m={2}
                     dangerouslySetInnerHTML={selectedType ? {__html: getHelpText(ticketTypes, selectedType)} : null}/>
            </Grid>
        </Grid>
    );
};

export default TypeSelection;