import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
  userId: String,
  name: String,
  data: String,
});

const Notes = mongoose.models.Notes || mongoose.model("Notes", notesSchema);

export default Notes;
