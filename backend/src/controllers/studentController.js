import pool from "../config/db.js";
import {
  createStudentService,
  deleteStudentService,
  getAllStudentsService,
  getStudentByIdService,
  updateStudentService,
  getStudentWithMarksService,
  getPaginatedStudentsService,
} from "../models/studentModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({ status, message, data });
};

export const getStudentByIdWithMarks = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await getStudentWithMarksService(id);

    if (!student) {
      return res.status(404).json({
        status: 404,
        message: "Student not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Student fetched with marks",
      data: student,
    });
  } catch (e) {
    next(e);
  }
};
// get all students
export const getAllStudents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const { data, meta } = await getAllStudentsService(page, limit);

    res.json({
      data,
      meta,
    });
  } catch (error) {
    next(error);
  }
};

// get paginated students
export const getPaginatedStudents = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const { students, total } = await getPaginatedStudentsService(page, limit);

    res.status(200).json({
      status: 200,
      message: "Paginated students fetched successfully",
      data: students,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (e) {
    next(e);
  }
};

// get all students without pagination
export const getAllStudentsNoPagination = async (req, res) => {
  try {
    const rows = await pool.query("SELECT * FROM students ORDER BY id ASC");

    return res.status(200).json({
      status: 200,
      data: rows.rows,
    });
  } catch (err) {
    console.error("❌ STUDENTS-ALL ERROR:", err); // <-- IMPORTANT
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

// create student
export const createStudent = async (req, res, next) => {
  const { name, email, age } = req.body;

  try {
    const newStudent = await createStudentService(name, email, age);
    handleResponse(res, 201, "Student created successfully", newStudent);
  } catch (error) {
    next(error);
  }
};

// get student by id
export const getStudentById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const student = await getStudentByIdService(id);

    if (!student) {
      handleResponse(res, 404, "Student not found", null);
      return;
    }

    handleResponse(res, 200, "Student fetched successfully", student);
  } catch (error) {
    next(error);
  }
};

// get student with marks

// update student
export const updateStudent = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    const updatedStudent = await updateStudentService(id, name, email, age);
    if (!updatedStudent) {
      handleResponse(res, 404, "Student not found", null);
      return;
    }
    handleResponse(res, 200, "Student updated successfully", updatedStudent);
  } catch (error) {
    next(error);
  }
};

// delete student
export const deleteStudent = async (req, res, next) => {
  // extract id from request
  const { id } = req.params;

  try {
    const deletedStudent = await deleteStudentService(id);
    if (!deletedStudent) {
      handleResponse(res, 404, "Student not found", null);
      return;
    }
    handleResponse(res, 200, "Student deleted successfully", deletedStudent);
  } catch (error) {
    next(error);
  }
};
