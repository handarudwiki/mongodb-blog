const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
dotenv.config();

const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const categoryRouter = require("./routes/categories");

app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));
mongoose.connect(process.env.MONGO_URL);

// Tangani event koneksi terbuka
mongoose.connection.on("open", () => {
  console.log("Terhubung ke MongoDB!");
});

// Tangani event error saat koneksi gagal
mongoose.connection.on("error", (err) => {
  console.error("Koneksi ke MongoDB gagal: ", err);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Gunakan originalname atau nama yang sesuai dengan kebutuhan Anda
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoryRouter);

app.listen(3000, () => {
  console.log("listerning on port 3000");
});
