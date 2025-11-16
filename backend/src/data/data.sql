
-- STUDENTS TABLE
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
); 

-- MARKS TABLE
CREATE TABLE IF NOT EXISTS marks (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL,
  subject VARCHAR(150) NOT NULL,
  score INT CHECK (score >= 0 AND score <= 100),
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_student
    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE CASCADE
);

-- Index for faster JOIN queries
CREATE INDEX IF NOT EXISTS idx_marks_student_id
  ON marks(student_id);