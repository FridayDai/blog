import * as React from 'react';
import classnames from 'classnames';
import Aside from '../components/Doc/Aside';
import Content from '../components/Doc/Content';
import { Item } from '../components/Doc/Aside';
import { dispatch } from '../../store';
import '../style/doc.less';
import { onNavChange, getNav, onInputKeyword, onSearchKeyword } from '../action/docDao';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const prefixCls = 'doc-container';
let timeout;

interface DocProps {
    dispatch: Function,
    history: any,
    location: any,
    docProps: {
        itemId: string,
        nav: Item[],
        content: object,
        keyword?: string,
    }
}

interface DocStates {
    open: boolean
}

class Doc extends React.Component<DocProps, DocStates> {
    constructor(props) {
        super(props);
        this.state = {
            'open': true
        }
    }

    componentDidMount() {
        dispatch(getNav());
    }

    clear() {
        if(timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    }

    renderDocPage() {
        const { nav, itemId, content, keyword } = this.props.docProps;

        const contentCls = `${prefixCls}-content`;
        const asideToggleCls = classnames(`${contentCls}-aside`, {
            'aside-close': !this.state.open
        });

        return (
            <div className={prefixCls}>
                <header className={`${prefixCls}-header`}>
                    <span>文档</span>
                </header>
                <section className={contentCls}>
                    <aside className={asideToggleCls}>
                        <span className='aside-toggle' onClick={() => this.setState({open: !this.state.open})}>
                            {this.state.open ? '<' : '>'}
                        </span>
                        <Aside
                            value={keyword}
                            onInputKeyword={(value:string) => {
                                dispatch(onInputKeyword(value));

                                this.clear();
                                timeout = setTimeout(() => {
                                    dispatch(onSearchKeyword(value));
                                }, 400);
                            }}
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
