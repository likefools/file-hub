const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
const fs = require("fs");

const port = process.env.PORT || 3000;

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "MY-FILES/");
  },
  filename: (req, file, cb) => {
    const decodedFileName = decodeURIComponent(file.originalname);

    cb(null, decodedFileName);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json({ message: "File uploaded successfully" });
});

app.get("/api/files", (req, res) => {
  const folderPath = path.join(__dirname, "MY-FILES");

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ files });
    }
  });
});

app.get("/api/download/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "MY-FILES", fileName);

  if (fs.existsSync(filePath)) {
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(fileName)}"`
    );
    res.setHeader("Content-type", "application/octet-stream");

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

app.delete("/api/delete/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "MY-FILES", fileName);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.status(200).json({ message: "File deleted successfully" });
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
