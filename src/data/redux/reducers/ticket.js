import {INITIALIZE_TICKET, UPDATE_TICKET_VALUES} from "../actions/ticket";

export const defaultState = {
    submitted: false,
    message: '',
    showNotification: false,
    optionError: false,
    types: ["Spørsmål", "Hendelse", "Annet",],
    priorities: ["Høy", "Middels", "Lav",],
    shortDescriptionError: '',
    descriptionError: '',
    secondaryOptions: '',

    values: {
        category: '',
        selectedType: '',
        selectedOption: '',
        shortDescription: '',
        description: '',
        selectedPriority: '',
        optionDisabled: true,
    },
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case INITIALIZE_TICKET:
            return defaultState;
        case UPDATE_TICKET_VALUES:
            return {
                ...state,
                values: action.payload,
            };
        default:
            return defaultState;
    }
}