import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express';
import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
// import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();

const app = express();
const port = 3001;

app.use(cors({origin: "http://localhost:3000"}))
// app.use(bodyParser.json());
// app.use(LOCAL_API.PATH, router);

app.listen(port, (req, res) => {
    console.log("Server is running on port " + port);
});

const { ACCESS_SECRET, ACCESS_KEY, REGION, BUCKET } = process.env;

aws.config.update({
    secretAccessKey: ACCESS_SECRET,
    accessKeyId: ACCESS_KEY,
    region: REGION,
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: BUCKET,
        key: (req, file, cb) => {
            console.log("file: ", file);
            cb(null, file.originalname)
        }
    })
})

app.post('/upload', upload.single('file'), async (req, res, next) => {
    res.send('Successfully uploaded ' + req.file.location + ' location!')
})

// app.post('/uploads', upload.array('files'), async (req, res, next) => {
//     res.send('Successfully uploaded ' + req.file.location + ' location!')
// })

app.get("/list", async (req, res) => {
    const result = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
    const fileNames = result.Contents.map(item => item.Key);
    res.send(fileNames)
})

const getPresignedURL = async (filename) => {
    // const s3 = createS3Instance();
    const params = {
        Bucket: BUCKET,
        Key: filename,
        Expires: 60
    }

    const preSignedURL = await s3.getSignedUrl('getObject', params);
    // const preSignedURL = await s3.getSignedUrl('getObject', params).promise();
    return preSignedURL;
}

app.get("/signedurl/:filename", async (req, res) => {
    const filename = req.params.filename
    
    const params = {
        Bucket: BUCKET,
        Key: filename,
        Expires: 60
    }

    const preSignedURL = s3.getSignedUrl('getObject', params);
    // const preSignedURL = await s3.getSignedUrl('getObject', params);
    // const preSignedURL = await s3.getSignedUrl('getObject', params).promise();
    // return preSignedURL;

    console.log("preSignedURL: ", preSignedURL)

    // res.send("signed url...")
    // res.send(`signed url: ${preSignedURL}`)
    res.send(String(preSignedURL));
})

// app.get("/signedurl/:filename", async (req, res) => {
//     const filename = req.params.filename
//     const presignedURL = await getPresignedURL(filename);
//     // res.status(200).send("presignedURL: ", presignedURL);
//     res.status(200).send("presignedURL: ", presignedURL);
//     // res.status(200).send("attempted download of: " + filename)
// })

app.get("/download/:filename", async (req, res) => {
    const filename = req.params.filename
    let result = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
    // res.send(result.Body)
    console.log("result: ", result);
    res.status(200).send(result.Body)
    // res.status(200).send("attempted download of: " + filename)
})

// app.get("/download/:filename", async (req, res) => {
//     const filename = req.params.filename
//     let result = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
//     // res.send(result.Body)
//     console.log("result: ", result);
//     res.status(200).send(result.Body)
//     // res.status(200).send("attempted download of: " + filename)
// })

app.delete("/delete/:filename", async (req, res) => {
    const filename = req.params.filename
    await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
    res.send("File Deleted Successfully")
})