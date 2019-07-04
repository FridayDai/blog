const homepageState = (state = {}, action) => {
    switch (action.type) {
        case 'getCompanyDetail':
            return Object.assign({}, state, { 'data': action.data });
        default:
            return state;
    }
};

export default homepageState;
