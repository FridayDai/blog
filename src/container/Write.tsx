import * as React from 'react';
import { saveDoc } from '../action/docDao';
import CodeMirror from 'react-codemirror';
import Content from '../components/Doc/Content';
// import { dispatch } from '../../store';
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
import { Res } from "../util";
import { toast } from "react-component-dy";

const prefixCls = 'write-container';

interface IWriteProps {
    dispatch: Function,
    history: any,
    location: any,
}
interface IWriteState {
    isOpen: boolean,
    code: string
}
interface ISaveModalProps {
    isOpen: boolean,
    onClose?: (
        args: {
            closeSource?: CLOSE_SOURCE[keyof CLOSE_SOURCE];
        },
    ) => any,
    onOK: (title: string, desc: string) => {}
}

class Write extends React.Component<IWriteProps, IWriteState> {
    constructor(props) {
        super(props);
        this.state = {
            'isOpen': false,
            'code': '### write something'
        };
        this.ctrlS = this.ctrlS.bind(this);
    }

    componentDidMount(): void {
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
                    autoFocus={true}
                    value={this.state.code}
                    onChange={(newCode) => this.setState({ 'code': newCode })}
                    options={{
                        mode: 'markdown',
                        lineNumbers: true,
                    }}
                />
                <div style={{ 'width': '50%', 'border': '1px solid #ccc', 'overflow': 'auto' }}>
                    <Content
                        content={{ 'text': this.state.code }}
                    />
                </div>
                <SaveModal
                    isOpen={this.state.isOpen}
                    onClose={() => this.setState({ 'isOpen': false })}
                    onOK={async (title, desc) => {
                        this.setState({ 'isOpen': false });
                        const res: Res = await saveDoc(title, desc, this.state.code);
                        if(res.code === 10000) {
                            toast.success('save success');

                            setTimeout(() => this.props.history.push('/doc'), 1500);
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

const SaveModal = ({isOpen, onClose, onOK}: ISaveModalProps) => {
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalHeader>保存内容</ModalHeader>
            <ModalBody>
                <p>请输入title</p>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
                <p>请输入description</p>
                <Input
                    value={desc}
                    onChange={(e) => setDesc(e.currentTarget.value)}
                />
            </ModalBody>
            <ModalFooter>
                <ModalButton onClick={() => onClose}>Cancel</ModalButton>
                <ModalButton onClick={() => onOK(title, desc)}>Okay</ModalButton>
            </ModalFooter>
        </Modal>
    );
};
