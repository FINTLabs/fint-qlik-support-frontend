import {
    CLEAR_TICKET_VALUES,
    INITIALIZE_TICKET, UPDATE_ORGANISATION_NAME, UPDATE_PERSON_DATA_CHECKBOX,
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

export const defaultState = {
    submitted: false,
    meSupportId: 1,
    message: '',
    response: {},
    showNotification: false,
    formError: false,
    categoryError: false,
    organisationError: false,
    optionError: false,
    shortDescriptionError: false,
    descriptionError: false,
    firstNameError: false,
    lastNameError: false,
    phoneError: false,
    mailError: false,
    statusUrl: '',
    personDataChecked: false,
    organisationName: '',
    categories: [],
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
    optionDisabled: {},
    optionsRequired: {},

    values: {
        selectedType:'',
        selectedPriority: '',
    },
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case INITIALIZE_TICKET:
            return {
                ...defaultState,
                categories: state.categories,
            };
        case UPDATE_TICKET_PRIORITIES:
            return {
                ...state,
                priorities: action.payload,
            };
        case CLEAR_TICKET_VALUES:
            return {
                ...state,
                values: {...state.values, selectedPriority: '', selectedType: '', shortDescription: '', description: '', selectedOption: ''},
            };
        case UPDATE_TICKET_TYPES:
            return {
                ...state,
                types: action.payload,
            };
        case UPDATE_TICKET_CATEGORY:
            return {
                ...state,
                categories: action.payload,
            };
        case UPDATE_ORGANISATION_NAME:
            return {
                ...state,
                organisationName: action.payload,
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
                optionsRequired: action.payload,
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
        case UPDATE_PERSON_DATA_CHECKBOX:
            return {
                ...state,
                personDataChecked: action.payload,
            };
        case UPDATE_VALID_FORM:
            return {
                ...state,
                formError: action.payload.formError,
                categoryError: action.payload.categoryError,
                optionError: action.payload.optionError,
                descriptionError: action.payload.descriptionError,
                shortDescriptionError: action.payload.shortDescriptionError,
                firstNameError: action.payload.firstNameError,
                lastNameError: action.payload.lastNameError,
                phoneError: action.payload.phoneError,
                mailError: action.payload.mailError,
                organisationError: action.payload.organisationError,
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