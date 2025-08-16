import { Router } from "express";
import { authlayer } from "../middlewares/auth.middleware.js";
import {
  changeNoteStatus,
  createNote,
  getNoteByStatus,
  getNotesOfLable,
  updateNote,
} from "../controllers/notes.controller.js";

const routes = Router();

routes.route("/:lableId/create-note").post(authlayer, createNote);

routes.route("/:noteId/status").patch(authlayer, changeNoteStatus);

routes.route("/status").get(authlayer, getNoteByStatus);

routes.get('/:lableId/notes' , authlayer , getNotesOfLable)

routes.patch('/update/:noteId' , authlayer , updateNote)

export default routes;
