import pool from "../config/db.js";

export const addMarkService = async (student_id, subject, score) => {
  const q = `
    INSERT INTO marks (student_id, subject, score)
    VALUES ($1, $2, $3)
    RETURNING *`;
  const r = await pool.query(q, [student_id, subject, score]);
  return r.rows[0];
};

export const getMarksByStudentService = async (student_id) => {
  const q = `SELECT * FROM marks WHERE student_id = $1`;
  const r = await pool.query(q, [student_id]);
  return r.rows;
};

export const updateMarkService = async (id, subject, score) => {
  const q = `
    UPDATE marks SET subject=$1, score=$2
    WHERE id=$3 RETURNING *`;
  const r = await pool.query(q, [subject, score, id]);
  return r.rows[0];
};

export const deleteMarkService = async (id) => {
  const q = `DELETE FROM marks WHERE id=$1 RETURNING *`;
  const r = await pool.query(q, [id]);
  return r.rows[0];
};
