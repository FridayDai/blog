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
import {start} from "repl";

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
        document.body.addEventListener('mousedown', (e: MouseEvent) => {
            let node = e.target as HTMLElement;
            if(node && node.className === 'aside-title') {
                const startWidth = e.clientX;

                node.onmousemove = (event: MouseEvent) => {
                    const offset = startWidth - event.clientX;
                    if(offset > 0) {
                        // 左滑
                        node.style.right = `${Math.abs(offset) > 30 ? 30 : Math.abs(offset)}px`;
                    } else {
                        // node.style.right = `-${Math.abs(offset) > 30 ? 30 : Math.abs(offset)}px`;
                    }
                };
                // document.body.addEventListener('mousemove', (e: MouseEvent) => {
                //
                // });
                document.body.onmouseup = () => {
                    node.onmousemove = null;
                    node.onmouseup = null;
                }
            }
        });
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
                    <span style={{ 'cursor': 'pointer' }} onClick={() => this.props.history.push('/write')}>文档</span>
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
                            onNavChange={(id) => {
                                if(id !== itemId) {
                                    dispatch(onNavChange(id));
                                }
                            }}
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
