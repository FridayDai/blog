// @ts-ignore
import React from 'react';
import axios from 'axios';
import { toast } from "react-component-dy";

interface UploadProps {}
interface UploadStates {
    file: object|null,
    fileSrc: string,
    fileAddress: string|null
}

class Upload extends React.Component<UploadProps, UploadStates> {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fileSrc: '',
            fileAddress: ''
        };
    }

    upload() {
        const { file } = this.state;
        const formData = new FormData();
        // @ts-ignore
        formData.append('file', file);
        axios.post('/api/uploadImg', formData).then((res: any) => {
            toast.success('上传成功')
            this.setState({
                fileAddress: res.data.data.address
            })
        }).catch(() => {
            toast.error('上传失败')
        });
    }

    render() {
        const { fileSrc, fileAddress } = this.state;
        return (
            <React.Fragment>
                <h1>上传图片</h1>
                <input
                    id='file'
                    accept="image/png, image/jpeg"
                    type="file"
                    name='uploadfile'
                    multiple
                    onChange={() => {
                        // @ts-ignore
                        const { files } = document.querySelector('#file');
                        this.setState({
                            file: files[0],
                            fileSrc: URL.createObjectURL(files[0])
                        });
                    }}
                />
                {
                    fileSrc && (
                        <div style={{ 'marginTop': '20px' }}>
                            <img id='preview' src={fileSrc} width={300} height={200} />
                        </div>
                    )
                }
                <div>
                    <button disabled={!fileSrc} onClick={() => this.upload()}>上传</button>
                </div>
                <div>
                    <span>图片地址：</span>
                    <span>{fileAddress}</span>
                </div>
            </React.Fragment>
        )
    }
}

export default Upload;
