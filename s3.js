const knox = require("knox");
const fs = require("fs");

let secrets;

if (process.env.NODE_ENV == "production") {
  secrets = process.env; // in prod the secrets are environment variables
} else {
  secrets = require("./secrets"); // secrets.json is in .gitignore
}

const client = knox.createClient({
  key: secrets.AWS_KEY,
  secret: secrets.AWS_SECRET,
  bucket: "spicedling"
});

exports.upload = function(req, res, next) {
  ///naming the file that we are uploading
  const s3Request = client.put(req.file.filename, {
    ///these 2 are headers that amazon set when serving the file
    "Content-Type": req.file.mimetype,
    "Content-Length": req.file.size,
    /// mesage to AWS to make the file public-read
    "x-amz-acl": "public-read"
  });
  const readStream = fs.createReadStream(req.file.path);
  readStream.pipe(s3Request);

  s3Request.on("response", s3Response => {
    if (s3Response.statusCode == 200) {
      next();
      /// unlinks = delete the file from HDD
      // fs.unlink(req.file.path, () => {});   remember to unlink
    } else {
      console.log(s3Response.statusCode);
      res.status(500).json({
        success: false
      });
    }
  });
};
