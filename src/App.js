import './App.css';
import S3DownloadComponent from './components/S3DownloadComponent/S3DownloadComponent';
import S3UploadComponent from './components/S3UploadComponent/S3UploadComponent';
import { isValidSignInToken } from './data/signInTokenValidator.mjs'; 

const TEST_SIGN_IN_TOKEN = "xyz789";
let signedIn = isValidSignInToken(TEST_SIGN_IN_TOKEN);

function App() {
    return (
        <div className="App">
            <S3DownloadComponent signedIn={signedIn}/>
            <S3UploadComponent signedIn={signedIn}/>
        </div>
    );
}

export default App;
