import { serverURL } from "./serverData.mjs";

class S3Uploader {
    #serverURL = serverURL;

    async upload(file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadResponse = await fetch(`${this.#serverURL}/upload`, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Length': '<calculated when request is sent>',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            },
            body: formData
        })

        console.log("uploadResponse: ", uploadResponse)
    }
}


const s3Uploader = new S3Uploader()
export default s3Uploader;