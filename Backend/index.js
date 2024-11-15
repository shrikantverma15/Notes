const express = require("express");
const connection = require("./config/db");
const app = express();
const cors = require("cors");
const userRouter = require("./route/user.route");
const noteRouter = require("./route/note.route");
const auth = require("./middleware/auth.middleware");

const PORT = process.env.PORT || 3000;
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/user", userRouter);
app.use("/note", auth, noteRouter);

app.get("/", (req, res) => {
  res.send("server is running fine");
});

app.listen(PORT, async () => {
  
  try {
    await connection;
    console.log(`server is connected to the port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
