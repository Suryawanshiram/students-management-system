import pool from "../config/db.js";

// export const getAllStudentsService = async () => {
//   const result = await pool.query("SELECT * FROM students");
//   return result.rows;
// };

export const getAllStudentsService = async (page = 1, limit = 5) => {
  const offset = (page - 1) * limit;

  const result = await pool.query(
    "SELECT * FROM students ORDER BY id LIMIT $1 OFFSET $2",
    [limit, offset]
  );

  const totalResult = await pool.query("SELECT COUNT(*) FROM students");
  const total = parseInt(totalResult.rows[0].count);

  return {
    data: result.rows,
    meta: {
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// get student with marks
export const getStudentWithMarksService = async (id) => {
  // fetch student
  const studentQuery = `SELECT * FROM students WHERE id = $1`;
  const studentResult = await pool.query(studentQuery, [id]);

  if (studentResult.rows.length === 0) return null;

  // fetch marks
  const marksQuery = `SELECT subject, score FROM marks WHERE student_id = $1`;
  const marksResult = await pool.query(marksQuery, [id]);

  return {
    ...studentResult.rows[0],
    marks: marksResult.rows,
  };
};

// get student by id service
export const getStudentByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
  return result.rows[0];
};

// get paginated students service
export const getPaginatedStudentsService = async (page, limit) => {
  const offset = (page - 1) * limit;

  const listQuery = `SELECT * FROM students ORDER BY id LIMIT $1 OFFSET $2`;
  const countQuery = `SELECT COUNT(*) FROM students`;

  const students = await pool.query(listQuery, [limit, offset]);
  const count = await pool.query(countQuery);

  return {
    students: students.rows,
    total: Number(count.rows[0].count),
  };
};

// create student service
export const createStudentService = async (name, email, age) => {
  const result = await pool.query(
    "INSERT INTO students (name, email, age) VALUES ($1, $2, $3) RETURNING *",
    [name, email, age]
  );
  return result.rows[0];
};

// update student service
export const updateStudentService = async (id, name, email, age) => {
  const result = await pool.query(
    "UPDATE students SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *",
    [name, email, age, id]
  );
  return result.rows[0];
};

// delete student service
export const deleteStudentService = async (id) => {
  const result = await pool.query(
    "DELETE FROM students WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
