import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log("Getting file path inside uploadOnCloudinary :", localFilePath);
        if(!localFilePath)
            return null;

        console.log("Getting file path inside uploadOnCloudinary :", localFilePath);
        // upload file on cloudinary
        //localFilePath="../../public/temp/Jyoti_pic.jpeg"
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log("Response after upload: ", response);
        //file has been uploaded successfully
        console.log("File has been uploaded successfully on cloudinary : ", response.url);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        //remove the locally saved uploaded file as the upload operation got failed
        fs.unlinkSync(localFilePath)
        return null;
        
    }
}

export {uploadOnCloudinary};