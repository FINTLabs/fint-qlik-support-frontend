import {
    INITIALIZE_TICKET,
    UPDATE_SECONDARY_OPTION_DISABLED,
    UPDATE_SECONDARY_OPTION_REQUIRED,
    UPDATE_SELECTED_OPTION,
    UPDATE_TICKET_CATEGORY,
    UPDATE_TICKET_NOTIFY_MESSAGE,
    UPDATE_TICKET_NOTIFY_USER,
    UPDATE_TICKET_PRIORITIES,
    UPDATE_TICKET_RESPONSE,
    UPDATE_TICKET_SELECTED_PRIORITY,
    UPDATE_TICKET_STATUS_URL,
    UPDATE_TICKET_SUBMITTED,
    UPDATE_TICKET_TYPES,
    UPDATE_TICKET_VALUES,
    UPDATE_TYPE,
    UPDATE_VALID_FORM
} from "../actions/ticket";
import {QLIK} from "../../constants/constants";

export const defaultState = {
    submitted: false,
    meSupportId: 1,
    message: '',
    response: {},
    showNotification: false,
    optionError: false,
    formError: false,
    statusUrl: '',
    organisationName: 'Ola Zendesk-test',
    categories:[],
    types: [
        {
            name: "Spørsmål",
            value: "question",
            help: "Spørsmål-hjelpetekst kommer her... ",
        },
        {
            name: "Hendelse",
            value: "happening",
            help: "Hendelse-hjelpetekst kommer her... ",
        },
        {
            name: "Annet",
            value: "other",
            help: "Annet-hjelpetekst kommer her... ",
        },
    ],
    priorities: [
        {
            name: "Høy",
            value: "high",
            help: "Høy prioritet ",
        },
        {
            name: "Middels",
            value: "medium",
            help: "Middels prioritet ",
        },
        {
            name: "Lav",
            value: "low",
            help: "Lav prioritet ",
        },
    ],
    shortDescriptionError: false,
    descriptionError: false,
    optionDisabled: false,
    secondaryOptionsRequired: true,

    values: {
        category: QLIK,
        selectedType: '',
        selectedOption: 'QLIKWIEW.COM',
        shortDescription: '',
        description: '',
        selectedPriority: '',
    },
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case INITIALIZE_TICKET:
            return defaultState;
        case UPDATE_TICKET_PRIORITIES:
            return {
                ...state,
                priorities: action.payload,
            };
        case UPDATE_TICKET_TYPES:
            return {
                ...state,
                types: action.payload,
            };
        case UPDATE_TICKET_CATEGORY:
            console.log("categoryOptions: ", action.payload);
            return {
                ...state,
                categories: action.payload,
            };
        case UPDATE_TICKET_VALUES:
            return {
                ...state,
                values: action.payload,
            };
        case UPDATE_TICKET_SUBMITTED:
            return {
                ...state,
                submitted: action.payload,
            };
        case UPDATE_TICKET_SELECTED_PRIORITY:
            return {
                ...state,
                values: {...state.values, selectedPriority: action.payload},
            };
        case UPDATE_SECONDARY_OPTION_DISABLED:
            return {
                ...state,
                optionDisabled: action.payload,
            };
        case UPDATE_SECONDARY_OPTION_REQUIRED:
            return {
                ...state,
                secondaryOptionsRequired: action.payload,
            };
        case UPDATE_TICKET_STATUS_URL:
            return {
                ...state,
                statusUrl: action.payload,
            };
        case UPDATE_TICKET_NOTIFY_USER:
            return {
                ...state,
                showNotification: action.payload,
            };
        case UPDATE_TICKET_NOTIFY_MESSAGE:
            return {
                ...state,
                message: action.payload,
            };
        case UPDATE_SELECTED_OPTION:
            return {
                ...state,
                values: {...state.values, selectedOption: action.payload},
            };
        case UPDATE_TYPE:
            return {
                ...state,
                values: {...state.values, selectedType: action.payload},
            };
        case UPDATE_VALID_FORM:
            return {
                ...state,
                formError: action.payload.formError,
                optionError: action.payload.optionError,
                descriptionError: action.payload.descriptionError,
                shortDescriptionError: action.payload.shortDescriptionError,
            };
        case UPDATE_TICKET_RESPONSE:
            return {
                ...state,
                response: action.payload,
            };
        default:
            return defaultState;
    }
}