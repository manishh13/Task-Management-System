import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import database from "./database/dataBase.js";
import routes from "./routes/routes.js";
import { routeNotFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();
database();
const App = express();

App.use(express.json());
App.use(
  cors({
    origin: "*",
  })
);
App.use(
  express.urlencoded({
    extended: true,
  })
);

App.use(cookieParser());
App.use(morgan("dev"));
App.use("/api", routes);

App.use(routeNotFound);
App.use(errorHandler);

const PORT = process.env.PORT || 4000;
App.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
