import {
    INITIALIZE_TICKET,
    UPDATE_TICKET_SELECTED_CATEGORY,
    UPDATE_TICKET_SELECTED_PRIORITY,
    UPDATE_TICKET_SUBMITTED,
    UPDATE_TICKET_VALUES
} from "../actions/ticket";

export function initializeTicket() {
    return (dispatch) => {
        dispatch({type: INITIALIZE_TICKET});
    }
}

export function updateTicketSubmitted() {
    return (dispatch) => {
        dispatch({type: UPDATE_TICKET_SUBMITTED});
    };
}

export function updateSelectedCategory() {
    return (dispatch) => {
        dispatch({type: UPDATE_TICKET_SELECTED_CATEGORY});
    };
}

export function updateTicketPriority() {
    return (dispatch) => {
        dispatch({
            type: UPDATE_TICKET_SELECTED_PRIORITY,
        });
    };
}

export function updateTicketValues(values) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_TICKET_VALUES,
            payload: values,
        });
    };
}