import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import markRoutes from "./routes/marksRoutes.js";
import {
  createStudentTable,
  createMarksTable,
} from "./data/createStudentTable.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(cors({ origin: "*" }));

// cors for Frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Routes
app.use("/api/", studentRoutes);
app.use("/api", markRoutes);
app.use(errorHandler);

// create student table starting server
const initDB = async () => {
  await createStudentTable();
  await createMarksTable();
};

initDB();

// get database name
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.json({ db: result.rows[0].current_database });
  } catch (err) {
    console.error("DB ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
