import * as React from 'react';
import { saveDoc, getDocById, updateDocById } from '../action/docDao';
import {Controlled as CodeMirror} from 'react-codemirror2';
import Content from '../components/Doc/Content';
import '../style/write.less';
import 'codemirror/mode/markdown/markdown';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton, ModalProps, CLOSE_SOURCE,
} from 'baseui/modal';
import { Input } from 'baseui/input';
import {Res, getUrlParams, handleRes} from "../util";
import { toast } from "react-component-dy";

const prefixCls = 'write-container';

interface IWriteProps {
    dispatch: Function,
    history: any,
    location: any,
}
interface IWriteState {
    isOpen: boolean,
    code: string,
    title: string,
    desc: string
}
interface ISaveModalProps {
    isOpen: boolean,
    title: string,
    desc: string,
    onTitleChange: Function,
    onDescChange: Function,
    onClose?: (
        args: {
            closeSource?: CLOSE_SOURCE[keyof CLOSE_SOURCE];
        },
    ) => any,
    onOK: (title: string, desc: string) => {}
}

class Write extends React.Component<IWriteProps, IWriteState> {
    private codeMirror;
    private id;

    constructor(props) {
        super(props);
        this.codeMirror = null;
        this.id = null;
        this.state = {
            'isOpen': false,
            'code': '### write something',
            'title': '',
            'desc': ''
        };
        this.ctrlS = this.ctrlS.bind(this);
    }

    async componentDidMount(): Promise<any> {
        const id = getUrlParams('id');
        this.id = id;
        if(id) {
            const res = await getDocById(id);
            handleRes(res, () => {
                this.setState({ 'code': res.data.text, 'title': res.data.title, 'desc': res.data.desc });
            });
        }
        document.body.addEventListener('keydown', this.ctrlS);
    }

    componentWillUnmount(): void {
        document.body.removeEventListener('keydown', this.ctrlS);
    }

    ctrlS(e) {
        if( e.ctrlKey === true && e.keyCode === 83){
            this.setState({ 'isOpen': true });
            return false; // 截取返回false就不会保存网页了
        }
    }

    render() {
        return (
            <div className={prefixCls}>
                <CodeMirror
                    className='codeMirror-area'
                    ref={node => { this.codeMirror = node; }}
                    onBeforeChange={(editor, data, value) => {
                        this.setState({'code': value}); // must be managed here
                    }}
                    value={this.state.code}
                    onChange={(editor, metadata, value) => {
                        this.setState({ 'code': value });
                    }}
                    options={{
                        mode: 'markdown',
                        lineNumbers: true,
                    }}
                />
                <div style={{ 'width': '50%', 'border': '1px solid #ccc', 'overflow': 'auto' }}>
                    <Content
                        id={''}
                        history={this.props.history}
                        canEdit={false}
                        content={{ 'text': this.state.code }}
                    />
                </div>
                <SaveModal
                    title={this.state.title}
                    desc={this.state.desc}
                    onTitleChange={value => this.setState({ 'title': value })}
                    onDescChange={value => this.setState({ 'desc': value })}
                    isOpen={this.state.isOpen}
                    onClose={() => this.setState({ 'isOpen': false })}
                    onOK={async (title, desc) => {
                        this.setState({ 'isOpen': false });
                        if(this.id) {
                            const res:Res = await updateDocById(this.id, title, desc, this.state.code);
                            if(res.status === 200) {
                                toast.success('更新成功');

                                setTimeout(() => this.props.history.push('/doc'), 1200);
                            }
                        } else {
                            const res: Res = await saveDoc(title, desc, this.state.code);
                            if(res.code === 10000) {
                                toast.success('保存成功');

                                setTimeout(() => this.props.history.push('/doc'), 1200);
                            }
                        }
                    }}
                />
            </div>
        );
    }
}

const Bind = (Component, mapStateToProps = (state) => state) => {
    return withRouter(connect(mapStateToProps)(Component));
};

export default Bind(Write);

const SaveModal = ({title, desc, onTitleChange, onDescChange, isOpen, onClose, onOK}: ISaveModalProps) => {
    // const [title, setTitle] = React.useState('');
    // const [desc, setDesc] = React.useState('');

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalHeader>保存内容</ModalHeader>
            <ModalBody>
                <p>请输入title</p>
                <Input
                    value={title}
                    onChange={(e) => onTitleChange(e.currentTarget.value)}
                />
                <p>请输入description</p>
                <Input
                    value={desc}
                    onChange={(e) => onDescChange(e.currentTarget.value)}
                />
            </ModalBody>
            <ModalFooter>
                <ModalButton onClick={() => onClose}>Cancel</ModalButton>
                <ModalButton onClick={() => onOK(title, desc)}>Okay</ModalButton>
            </ModalFooter>
        </Modal>
    );
};