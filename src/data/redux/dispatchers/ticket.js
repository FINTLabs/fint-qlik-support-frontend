import {
    INITIALIZE_TICKET,
    UPDATE_SELECTED_OPTION,
    UPDATE_SECONDARY_OPTION_DISABLED,
    UPDATE_SECONDARY_OPTION_REQUIRED,
    UPDATE_TICKET_SELECTED_CATEGORY,
    UPDATE_TICKET_SELECTED_PRIORITY,
    UPDATE_TICKET_SUBMITTED,
    UPDATE_TICKET_VALUES,
    UPDATE_TYPE,
    UPDATE_VALID_FORM,
    UPDATE_TICKET_STATUS_URL,
    UPDATE_TICKET_NOTIFY_USER,
    UPDATE_TICKET_NOTIFY_MESSAGE
} from "../actions/ticket";

export function initializeTicket() {
    return (dispatch) => {
        dispatch({type: INITIALIZE_TICKET});
    }
}

export function updateTicketSubmitted(value) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_TICKET_SUBMITTED,
            payload: value
        });
    };
}

export function updateTicketStatusUrl(value) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_TICKET_STATUS_URL,
            payload: value,
        });
    };
}


export function updateSelectedCategory() {
    return (dispatch) => {
        dispatch({type: UPDATE_TICKET_SELECTED_CATEGORY});
    };
}

export function updateTicketPriority(value) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_TICKET_SELECTED_PRIORITY,
            payload: value,
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
export function updateSecondaryOptionDisabled(value) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_SECONDARY_OPTION_DISABLED,
            payload: value,
        });
    };
}
export function updateSecondaryOptionRequired(value) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_SECONDARY_OPTION_REQUIRED,
            payload: value,
        });
    };
}
export function updateSelectedOption(value) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_SELECTED_OPTION,
            payload: value,
        });
    };
}
export function updateType(value) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_TYPE,
            payload: value,
        });
    };
}
export function updateNotifyUser(value) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_TICKET_NOTIFY_USER,
            payload: value,
        });
    };
}
export function updateNotifyMessage(value) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_TICKET_NOTIFY_MESSAGE,
            payload: value,
        });
    };
}
export function updateValidForm(value) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_VALID_FORM,
            payload: value,
        });
    };
}
