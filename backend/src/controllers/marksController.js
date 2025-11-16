import {
  addMarkService,
  getMarksByStudentService,
  updateMarkService,
  deleteMarkService,
} from "../models/marksModel.js";

const send = (res, status, message, data = null) =>
  res.status(status).json({ status, message, data });

// for add mark
export const addMark = async (req, res, next) => {
  try {
    const { student_id, subject, score } = req.body;
    const m = await addMarkService(student_id, subject, score);
    send(res, 201, "Mark added", m);
  } catch (e) {
    next(e);
  }
};

// for get marks by student
export const getMarksByStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const m = await getMarksByStudentService(studentId);
    send(res, 200, "Marks fetched", m);
  } catch (e) {
    next(e);
  }
};

// for update mark
export const updateMark = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { subject, score } = req.body;
    const m = await updateMarkService(id, subject, score);
    send(res, 200, "Mark updated", m);
  } catch (e) {
    next(e);
  }
};

// for delete mark
export const deleteMark = async (req, res, next) => {
  try {
    const { id } = req.params;
    const m = await deleteMarkService(id);
    send(res, 200, "Mark deleted", m);
  } catch (e) {
    next(e);
  }
};
