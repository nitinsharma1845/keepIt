import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Note } from "../models/Note.model.js";
import { Lable } from "../models/Lable.model.js";

const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const { lableId } = req.params;

  if (!title.trim() || !content.trim())
    throw new ApiError(400, "Title or Content is missing");

  const lable = await Lable.findById(lableId);

  if (!lable) throw new ApiError(400, "Lable Not Found...");

  const note = await Note.create({
    title,
    content,
    owner: req.user._id,
    lable: lable._id,
  });

  await Lable.findByIdAndUpdate(lableId, {
    $addToSet: { notes: note._id },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, note, "Note Created Sucessfully..."));
});

const changeNoteStatus = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const { noteId } = req.params;

  if (!["archived", "active", "trashed"].includes(status))
    throw new ApiError(403, "Invalid status type...");

  const note = await Note.findOneAndUpdate(
    { _id: noteId, owner: req.user._id },
    { status },
    { new: true }
  );

  if (!note) throw new ApiError(500, "Error while fetchng...");

  return res
    .status(200)
    .json(new ApiResponse(200, note, `Status changed to ${status} `));
});

const getNoteByStatus = asyncHandler(async (req, res) => {
  const { status } = req.query;

  if (!["archived", "active", "trashed"].includes(status))
    throw new ApiError(403, "Invalid status type...");

  const notes = await Note.find({ status, owner: req.user._id });

  if (!notes || notes?.length < 1)
    return res.status(200).json(new ApiResponse(404, [], "No notes found"));

  return res
    .status(200)
    .json(new ApiResponse(200, notes, "Notes fetched sucessfully..."));
});

const getNotesOfLable = asyncHandler(async (req, res) => {
  const { lableId } = req.params;

  const notes = await Note.find({ lable: lableId, owner: req.user._id });

  if (!notes || notes.length === 0)
    return res.status(200).json(new ApiResponse(200, [], "No note found..."));

  return res
    .status(200)
    .json(new ApiResponse(200, notes, "Notes fetched successfully..."));
});

const updateNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const { noteId } = req.params;

  if (!title|| !content)
    throw new ApiError(400, "Title or Content is missing");

   if (!noteId) {
    throw new ApiError(400, "Note ID is required");
  }

  const note = await Note.findByIdAndUpdate(
    noteId,
    { title, content },
    { new: true }
  );

  if (!note) throw new ApiError(404, "No note found");

  return res
    .status(200)
    .json(new ApiResponse(200, note, "Note updated successfully..."));
});

export {
  createNote,
  changeNoteStatus,
  getNoteByStatus,
  getNotesOfLable,
  updateNote,
};
