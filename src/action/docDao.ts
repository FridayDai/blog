import {axiosGet, axiosPost, handleRes} from '../util/index';

export const Nav_Change = 'Nav_Change';
export const GET_NAV = 'GET_NAV';
export const GET_CONTENT = 'GET_CONTENT';
export const On_Input_Keyword = 'On_Input_Keyword';

export const onNavChange = (itemId) => async(dispatch) => {
    const res = await axiosGet(`/api/getDocById?id=${itemId}`, null);
    handleRes(res, () => {
        dispatch({ 'type': Nav_Change, 'data': res.data });
    });
};

export const getNav = () => (dispatch) => {
    axiosGet('/api/getDocTitle', null).then(res => {
        handleRes(res, () => {
            const list:any = [];
            res.data.forEach((item) => {
                const obj = { 'title': item.title, 'itemId': `${item.id}` };
                list.push(obj);
            });
            dispatch({ 'type': GET_NAV, 'data': list });
            axiosGet(`/api/getDocById?id=${res.data[0].id}`, null).then(docRes => {
                handleRes(docRes, () => {
                    dispatch({ 'type': GET_CONTENT, 'data': docRes.data });
                });
            });
        });
    });
};

export const onInputKeyword = (value) => (dispatch) => {
    dispatch({ type: On_Input_Keyword, data: value });
};

export const onSearchKeyword = (value) => (dispatch) => {
    axiosPost('/api/getDocListByKeyword', { keyword: value }).then(res => {
        const list:any = [];
        res.data.forEach((item) => {
            const obj = { 'title': item.title, 'itemId': `${item.id}` };
            list.push(obj);
        });
        dispatch({ 'type': GET_NAV, 'data': list });
        axiosGet(`/api/getDocById?id=${res.data[0].id}`, null).then(docRes => {
            handleRes(docRes, () => {
                dispatch({ 'type': GET_CONTENT, 'data': docRes.data });
            });
        });
    });
};
