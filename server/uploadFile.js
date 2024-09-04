// const AWS = require("aws-sdk");
// require("dotenv").config();
// const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY  } = process.env;

// AWS.config.update({
//     region: 'us-east-1',
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY
// });
// const s3 = new AWS.S3();

// const uploadDataURL = async ()=>{
//     await s3.putObject({
//     Body: "hello world",
//     Bucket: "lostcatimagebucket",
//     Key: "myfile.txt"
// }).promise();
// }

// const readFile = async ()=>{
//     try{
//         const response = await s3.listObjectsV2({ 
//         Bucket: "lostcatimagebucket",
//         Prefix: "cat400"
//         }).promise()
//         console.log(response);
//     } catch (e){
//         console.log("our error", e);
//     }
    
// }
// readFile();