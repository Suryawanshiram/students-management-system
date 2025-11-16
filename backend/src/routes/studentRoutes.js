import express from "express";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getAllStudentsNoPagination,
  getPaginatedStudents,
  getStudentById,
  getStudentByIdWithMarks,
  updateStudent,
} from "../controllers/studentController.js";
import validateStudent from "../middlewares/inputValidator.js";

const router = express.Router();

router.post("/student", validateStudent, createStudent);
router.get("/students", getAllStudents);
router.get("/student/:id", getStudentById);
router.get("/student/:id/with-marks", getStudentByIdWithMarks);
router.put("/student/:id", validateStudent, updateStudent);
router.delete("/student/:id", deleteStudent);
router.get("/students/paginated", getPaginatedStudents);
router.get("/students-all", getAllStudentsNoPagination);

export default router;
