import pool from "../config/db.js";

const createStudentTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        age INT,
        created_at TIMESTAMP DEFAULT NOW()
    )
  `;
  try {
    await pool.query(queryText);
    console.log("Table created successfully if not exists");
  } catch (error) {
    console.error("Error creating Students table:", error.message);
  }
};

const createMarksTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS marks (
        id SERIAL PRIMARY KEY,
        student_id INT NOT NULL,
        subject VARCHAR(150) NOT NULL,
        score INT CHECK(score >= 0 AND score <= 100),
        created_at TIMESTAMP DEFAULT NOW(),
        CONSTRAINT fk_student
          FOREIGN KEY (student_id)
          REFERENCES students(id)
          ON DELETE CASCADE
    );
  `;
  try {
    await pool.query(queryText);
    console.log("Marks table created successfully if not exists");
  } catch (error) {
    console.error("Error creating Marks table:", error.message);
  }
};

export { createStudentTable, createMarksTable };
