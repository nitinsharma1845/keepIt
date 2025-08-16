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

//Routes

import userRoute from './routes/user.routes.js'
import lableRoute from './routes/label.routes.js'
import notesRoute from './routes/notes.routes.js'

app.use('/api/v1/user', userRoute)
app.use('/api/v1/lable' , lableRoute )
app.use('/api/v1/note' , notesRoute)

export default app;
