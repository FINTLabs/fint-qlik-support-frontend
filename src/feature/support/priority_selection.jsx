import React from 'react';
import {Grid} from "@material-ui/core";
import OutlinedSelector from "./outlined_selector";
import Box from "@material-ui/core/Box";
import {useSelector} from "react-redux";

const PrioritySelection = () => {
    const selectedPriority = useSelector(state => state.ticket.values.selectedPriority);
    const ticketPriorities = useSelector(state => state.ticket.priorities);

    function getHelpText(options, value) {
        if (options.length > 0) {
            return options.filter((o) => o.value === value)[0].help;
        }
    }
    return (
        <Grid container>
            <Grid item xs={2}>
                <OutlinedSelector
                    name={"priority"}
                />
            </Grid>
            <Grid item xs={10}>
                <Box m={2}
                     dangerouslySetInnerHTML={selectedPriority ? {__html: getHelpText(ticketPriorities, selectedPriority)} : null}/>
            </Grid>
        </Grid>
    );
};

export default PrioritySelection;