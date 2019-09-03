import { Nav_Change, GET_NAV, GET_CONTENT, On_Input_Keyword } from "../action/docDao";

export interface Action {
    type: string,
    data?: any
}

const defaultState = {
    nav: [],
    itemId: '',
    content: Object,
    keyword: ''
};

const docProps = (state = defaultState, action: Action) => {
    switch (action.type) {
        case Nav_Change:
            return Object.assign({}, state, {
                'itemId': action.data.id.toString(),
                'content': action.data
            });
        case GET_NAV:
            return Object.assign({}, state, { 'nav': action.data, 'itemId': action.data[0].itemId });
        case GET_CONTENT:
            return {...state, content: action.data};
        case On_Input_Keyword:
            return {...state, keyword: action.data };
        default:
            return state;
    }
};

export default docProps;
