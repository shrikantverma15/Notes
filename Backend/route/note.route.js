const express = require("express");
const noteModel = require("../model/note.model");

const noteRouter = express.Router();

noteRouter.post("/create", async (req, res) => {
  console.log(req.user, req.body);
  const { title, content, status } = req.body;
  const userId = req.user._id;

  try {
    const note = new noteModel({
      title,
      content,
      status,
      userId,
    });

    await note.save();
    res.status(201).json({
      message: "Note created successfully",
    });
  } catch (error) {
    res.status(401).json({
      message: `Error creating note ${error}`,
    });
  }
});

noteRouter.get("/", async (req, res) => {
  const userId = req.user._id;
  try {
    const notes = await noteModel.find({ userId });
    res.status(200).json({
      notes,
    });
  } catch (error) {
    res.status(401).json({
      message: `Error fetching notes ${error}`,
    });
  }
});

noteRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, status } = req.body;
  try {
    const note = await noteModel.findByIdAndUpdate(
      id,
      { title, content, status },
      { new: true }
    );
    res.status(200).json({
      note,
    });
  } catch (error) {
    res.status(401).json({
      message: `Error updating note ${error}`,
    });
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(401).json({
      message: `Error deleting note ${error}`,
    });
  }
});


module.exports = noteRouter;
