import { Nav_Change, GET_NAV, GET_CONTENT } from "../action/docDao";

export interface Action {
    type: string,
    data?: any
}

const defaultState = {
    nav: [],
    itemId: '',
    content: Object
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
        default:
            return state;
    }
};

export default docProps;
