import { Injectable } from "@nestjs/common";
import { UploadApiErrorResponse, UploadApiResponse, v2 } from "cloudinary";
import configuration from "src/config/configuration";
const toStream = require("buffer-to-stream");

@Injectable()
export class CloudinaryService {
  constructor() {
    v2.config({
      cloud_name: configuration.cloudinary.cloud_name,
      api_key: configuration.cloudinary.api_key,
      api_secret: configuration.cloudinary.api_secret,
    });
  }

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadApiErrorResponse | UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      file = {
        ...file,
        fieldname: `${new Date().toISOString()}_${file.originalname}`,
      };
      console.log(file);
      toStream(file.buffer).pipe(upload);
    });
  }
}
