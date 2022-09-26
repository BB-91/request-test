import { useRef } from "react";
import "./S3UploadComponent.scss";
import s3Uploader from "../../data/s3Uploader.mjs";

const KEY = {
    file_upload: "file-upload",
}

const S3UploadComponent = (props) => {
    const { signedIn } = props;
    const fileUploadElement = useRef(null);

    const handleFileInputChange = async (event) => {
        const file = fileUploadElement.current.files[0]
        s3Uploader.upload(file);
    }

    return (
        <div className='s3-upload-component'>
            S3UploadComponent

            <input ref={fileUploadElement} type="file" name={KEY.file_upload} className={KEY.file_upload} onChange={handleFileInputChange} />
        </div>
    )
}

export default S3UploadComponent;
