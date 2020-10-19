import express from "express";
import Note from "../models/note";

const router = express.Router();

router.get("/notes", async (req, res) => {
  try {
    const note = await Note.find();
    return res.json(note);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/notes", async (req, res) => {
  const body = req.body;

  try {
    const note = await Note.create(body);
    return res.json(note);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/notes/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const note = await Note.findOne({ _id });

    if (!note) {
      return res.status(500).json({ error: "No se encuentra la nota" });
    }

    return res.json(note);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.put("/notes/:id", async (req, res) => {
  const _id = req.params.id;
  const body = req.body;

  try {
    const note = await Note.findByIdAndUpdate(_id, body, { new: true });

    if (!note) {
      return res.status(500).json({ error: "No se encuentra la nota" });
    }

    return res.json(note);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.delete("/notes/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const note = await Note.findByIdAndDelete({ _id });

    if (!note) {
      return res.status(500).json({ error: "No se encuentra la nota" });
    }

    return res.json(note);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
