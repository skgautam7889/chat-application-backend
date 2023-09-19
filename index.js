const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const router = require("./routes/users");
const PORT = 5000;
dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
}

// Call the async function to establish the MongoDB connection
connectToMongoDB();

app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});
