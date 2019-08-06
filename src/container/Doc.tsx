import * as React from 'react';
// import classnames from 'classnames';
import Aside from '../components/Doc/Aside';
import Content from '../components/Doc/Content';
import { Item } from '../components/Doc/Aside';
import { dispatch } from '../../store';
import '../style/doc.less';
import { onNavChange, getNav } from '../action/docDao';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const prefixCls = 'doc-container';

interface DocProps {
    dispatch: Function,
    history: any,
    location: any,
    docProps: {
        itemId: string,
        nav: Item[],
        content: object
    }
}

class Doc extends React.Component<DocProps> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        dispatch(getNav());
    }

    renderDocPage() {
        const { nav, itemId, content } = this.props.docProps;

        const contentCls = `${prefixCls}-content`;
        return (
            <div className={prefixCls}>
                <header className={`${prefixCls}-header`}>文档</header>
                <section className={contentCls}>
                    <aside className={`${contentCls}-aside`}>
                        <Aside
                            nav={nav}
                            itemId={itemId}
                            onNavChange={(id) => dispatch(onNavChange(id))}
                        />
                    </aside>
                    <section className={`${contentCls}-body`}>
                        <Content
                            content={content}
                        />
                    </section>
                </section>
                {/* <footer className={`${prefixCls}-footer`}>this is footer</footer> */}
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>{this.renderDocPage()}</React.Fragment>
        );
    }
}

const Bind = (Component, mapStateToProps = (state) => state) => {
    return withRouter(connect(mapStateToProps)(Component));
};

export default Bind(Doc);
