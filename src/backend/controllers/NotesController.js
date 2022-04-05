import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

export const addNewNotesHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const videoId = request.params.videoId;
    const { newNote } = JSON.parse(request.requestBody);
    user.notes.push({ ...newNote, _id: uuid(), videoId });
    return new Response(201, {}, { notes: user.notes });
  }
  return new Response(
    404,
    {},
    {
      errors: ["The email you entered is not Registered. Not Found error"],
    }
  );
};


export const deleteNoteHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const noteId = request.params.noteId;
    const filteredNotes = user.notes.filter(note=>note._id!==noteId);
    this.db.users.update({ notes: filteredNotes });
    return new Response(200, {}, { notes: filteredNotes });
  }
  return new Response(
    404,
    {},
    {
      errors: ["The email you entered is not Registered. Not Found error"],
    }
  );
};
