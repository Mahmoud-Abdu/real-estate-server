import express from "express.js";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/user.routes.js";
import propertyRouter from "./routes/property.routes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send({ message: "hello world" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/properties", propertyRouter);

const startServer = async () => {
  try {
    //connect to the db..
    connectDB(process.env.MONGODB_URL);
    const port = 8080;
    app.listen(port, () =>
      console.log(`Server started on port http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
