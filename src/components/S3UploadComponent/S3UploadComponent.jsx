import { useRef } from "react";
import "./S3UploadComponent.scss";

const KEY = {
    file_upload: "file-upload",
}

const S3UploadComponent = (props) => {
    const { signedIn } = props;
    const fileUploadElement = useRef(null);

    const handleFileInputChange = async (event) => {
        const files = fileUploadElement.current.files;
        const lastSelectedFile = files[files.length - 1];
        console.log("file changed.");
        console.log("fileUploadElement.current.files: ", fileUploadElement.current.files);
        console.log("lastSelectedFile: ", lastSelectedFile);

        const formData = new FormData();
        formData.append("file", lastSelectedFile);

        const uploadResponse = await fetch("http://localhost:3001/upload", {
            method: 'POST',

            headers: {
                'Accept': '*/*',
                // 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                'Content-Length': '<calculated when request is sent>',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            },

            // body: JSON.stringify(lastSelectedFile)
            // body: lastSelectedFile
            // body: {file: lastSelectedFile}
            // body: JSON.stringify({file: lastSelectedFile})
            body: formData
            // body: JSON.stringify(formData)
        })

        console.log("uploadResponse: ", uploadResponse)
    }

    return (
        <div className='s3-upload-component'>
            S3UploadComponent

            <input ref={fileUploadElement} type="file" name={KEY.file_upload} className={KEY.file_upload} onChange={handleFileInputChange} />
        </div>
    )
}

export default S3UploadComponent;
