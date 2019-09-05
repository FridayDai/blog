import * as React from 'react';
import {Item, Navigation} from 'baseui/side-navigation';
import {Input} from "baseui/input";
import {Search} from 'baseui/icon';

interface AsideProps {
    nav: Item[],
    itemId: string,
    onNavChange: Function
}

export interface Item {
    title: React.ReactNode;
    itemId?: string;
    subNav?: Item[];
}

const Aside = ({nav, itemId, onNavChange, value, onInputKeyword}) => {
    const newNav = Array();
    nav.forEach(item => {
        newNav.push({
            'itemId': item.itemId,
            'title': <div className='aside-title'>{item.title}</div>
        });
    });

    return (
        <React.Fragment>
            <div style={{ 'position': 'sticky', 'top': '0px', 'zIndex': 3 }}>
                <Input
                    endEnhancer={<Search size="18px" />}
                    placeholder={'Keyword'}
                    value={value}
                    onChange={(e) => onInputKeyword(e.currentTarget.value)}
                />
            </div>

            <Navigation
                items={newNav}
                activeItemId={itemId}
                onChange={({event, item}) => {
                    onNavChange(item.itemId);
                    event.preventDefault();
                }}
                overrides={{
                    // NavItem: {
                    //     style: {
                    //         'text-overflow': 'ellipsis',
                    //         'overflow': 'hidden',
                    //         'width': '98%',
                    //         'white-space': 'nowrap'
                    //     }
                    // },
                    // NavItem: {
                    //     style: ({$active, $theme}) => {
                    //         if (!$active)
                    //             return {
                    //                 ':hover': {
                    //                     color: '#002db3', // $theme.colors.positive400,
                    //                 },
                    //             };
                    //         return {
                    //             backgroundColor: '#455A64', // $theme.colors.positive400,
                    //             borderLeftColor: $theme.colors.mono900,
                    //             color: $theme.colors.mono900,
                    //             ':hover': {
                    //                 color: '#002db3' // $theme.colors.positive400,
                    //             }
                    //         };
                    //     },
                    // },
                }}
            />
        </React.Fragment>
    );
};

export default Aside;
