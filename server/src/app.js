import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(cookieParser());
app.use(express.json({ limit: "20kb" }));
app.use(express.static('public'))

export default app;
