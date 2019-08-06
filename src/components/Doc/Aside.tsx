import * as React from 'react';
import {Item, Navigation} from 'baseui/side-navigation';

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

const Aside = ({nav, itemId, onNavChange}) => {
    return (
        <Navigation
            items={nav}
            activeItemId={itemId}
            onChange={({event, item}) => {
                onNavChange(item.itemId);
                event.preventDefault();
            }}
            overrides={{
                NavItem: {
                    style: ({$active, $theme}) => {
                        if (!$active)
                            return {
                                ':hover': {
                                    color: '#002db3' // $theme.colors.positive400,
                                },
                            };
                        return {
                            backgroundColor: '#455A64', // $theme.colors.positive400,
                            borderLeftColor: $theme.colors.mono900,
                            color: $theme.colors.mono900,
                            ':hover': {
                                color: '#002db3' // $theme.colors.positive400,
                            },
                        };
                    },
                },
            }}
        />
    );
};

export default Aside;
