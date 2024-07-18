const {bucket} = require("../utils/UploadFile");

const uploadFile = (img) => {
  return new Promise((resolve, reject) => {
    const blob = bucket.file(img.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      console.error(err);
      reject("Error uploading file");
    });

    blobStream.on("finish", async () => {
      try {
        const [url] = await blob.getSignedUrl({
          action: "read",
          expires: "01-01-2100",
        });
        resolve(url);
      } catch (err) {
        console.error(err);
        reject("Error generating signed URL");
      }
    });

    blobStream.end(img.buffer);
  });
};

module.exports = uploadFile;