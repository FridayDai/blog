import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

const Content = ({ content }) => {
    return (
        <div style={{ 'padding': '12px' }}>
            <ReactMarkdown
                className={'markdown-body'}
                escapeHtml={false}
                source={content.text}
                renderers={{ code: CodeBlock,
                    // table: (props) => {
                    //     return (<table className='markdown-table'>{props.children}</table>)
                    // }
                }}
            />
        </div>
    );
};

export default Content;
