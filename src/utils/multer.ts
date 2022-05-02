import path from "path";
import multer from "multer";
import crypto from "crypto";



export default multer({
    //storage: multer.memoryStorage(),
   storage: multer.diskStorage({
    destination: path.resolve(__dirname, '../', 'public','images'),
    filename(request, file, callback){
        const hash = crypto.randomBytes(5).toString("hex");
        const filename = `${hash}-${file.originalname}`
        callback(null, filename);
    }, 
  }), 
  limits: {
      fileSize: 1024 * 1024
  }
});