import './App.css';
import { useRef } from 'react';
import downloader from './data/responseDownloader.mjs';

function App() {
    const filenameInputRef = useRef(null);

    const handleDownloadFileButtonClicked = () => {
        const filename = filenameInputRef.current.value;
        downloader.downloadS3File(filename);
    }

    return (
        <div className="App">
            <input ref={filenameInputRef} type="text" ></input>
            {/* <input type="button" value={"get S3 filenames"} onClick={getS3FileNames}/> */}
            {/* <input type="button" value={"get signed url"} onClick={getSignedURL}/> */}
            <input type="button" value={"download file"} onClick={handleDownloadFileButtonClicked}/>
        </div>
    );
}

export default App;
