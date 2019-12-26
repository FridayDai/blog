import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Button, KIND } from 'baseui/button';
import { deleteDocById, getNav } from '../../action/docDao';
import CodeBlock from './CodeBlock';
import { toast } from 'react-component-dy';
import { dispatch } from "../../../store";

const Content = ({ content, canEdit, history, id }) => {
    return (
        <div style={{ 'padding': '12px' }}>
            {
                canEdit && (
                    <div>
                        <Button
                            $style={{ 'marginRight': '16px' }}
                            kind={KIND.primary}
                            onClick={() => history.push(`/write?id=${id}`)}
                        >
                            编辑
                        </Button>
                        <Button
                            kind={KIND.primary}
                            onClick={async() => {
                                const res = await deleteDocById(id);
                                if(res.status === 200) {
                                    toast.success('删除成功');
                                    dispatch(getNav());
                                } else {
                                    toast.success('删除失败');
                                }
                            }}
                        >
                            删除
                        </Button>
                    </div>
                )
            }

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
