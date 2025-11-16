import express from "express";
import {
  addMark,
  getMarksByStudent,
  updateMark,
  deleteMark,
} from "../controllers/marksController.js";

const router = express.Router();

router.post("/mark", addMark);
router.get("/marks/:studentId", getMarksByStudent);
router.put("/mark/:id", updateMark);
router.delete("/mark/:id", deleteMark);

export default router;
