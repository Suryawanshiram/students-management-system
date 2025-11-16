# Student Management System

A complete full-stack application with Node.js backend and vanilla JavaScript frontend using Bootstrap.

## Features

- ✅ Complete CRUD operations for students
- ✅ Normalized PostgreSQL database with foreign key relationships
- ✅ RESTful API with pagination support
- ✅ Search functionality
- ✅ Bootstrap responsive UI
- ✅ SweetAlert2 for user feedback
- ✅ View student details with marks
- ✅ Postman collection for API testing

## Technology Stack

**Backend:**
- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)

**Frontend:**
- HTML5
- JavaScript (Vanilla)
- Bootstrap 5
- SweetAlert2
- Font Awesome

## Project Structure

```
student-management/
├── server.js           # Backend API server
├── package.json        # Node.js dependencies
├── index.html          # Frontend application
├── schema.sql          # Database schema
└── postman_collection.json  # API testing collection
```

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation Steps

### 1. Database Setup

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE student_db;

# Connect to database
\c student_db

# Run the schema.sql file
\i /path/to/schema.sql

# Or copy-paste the SQL commands from schema.sql
```

### 2. Backend Setup

```bash
# Create project directory
mkdir student-management
cd student-management

# Initialize npm
npm init -y

# Install dependencies
npm install express pg cors

# Install nodemon for development (optional)
npm install --save-dev nodemon

# Create server.js file and copy the backend code

# Update database credentials in server.js
# Edit the pool configuration:
const pool = new Pool({
  user: 'your_username',      # Your PostgreSQL username
  host: 'localhost',
  database: 'student_db',
  password: 'your_password',  # Your PostgreSQL password
  port: 5432,
});
```

### 3. Start the Backend Server

```bash
# Start server
npm start

# Or with nodemon (auto-restart on changes)
npm run dev
```

The server will start at `http://localhost:3000`

### 4. Frontend Setup

1. Create `index.html` in the project root
2. Copy the frontend HTML code
3. Open `index.html` in a web browser
4. Or use a simple HTTP server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js http-server
npx http-server -p 8080
```

Then navigate to `http://localhost:8080`

## API Endpoints

### Students

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/students` | Create new student |
| GET | `/api/students` | Get all students (with pagination) |
| GET | `/api/students/:id` | Get student by ID with marks |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |

### Query Parameters for Pagination

- `page` - Page number (default: 1)
- `limit` - Records per page (default: 10)
- `search` - Search by name or email

**Example:**
```
GET http://localhost:3000/api/students?page=2&limit=10&search=john
```

### Marks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/marks` | Add marks for a student |

### Subjects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/subjects` | Get all subjects |

## API Request Examples

### Create Student
```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "date_of_birth": "2000-05-15"
  }'
```

### Get Students (Paginated)
```bash
curl http://localhost:3000/api/students?page=1&limit=10
```

### Get Student by ID
```bash
curl http://localhost:3000/api/students/1
```

### Update Student
```bash
curl -X PUT http://localhost:3000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Smith",
    "email": "john.smith@example.com",
    "date_of_birth": "2000-05-15"
  }'
```

### Delete Student
```bash
curl -X DELETE http://localhost:3000/api/students/1
```

## Database Schema

### Tables

**students**
- `id` - Primary key (auto-increment)
- `first_name` - VARCHAR(100)
- `last_name` - VARCHAR(100)
- `email` - VARCHAR(255) UNIQUE
- `date_of_birth` - DATE
- `enrollment_date` - DATE
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

**subjects**
- `id` - Primary key (auto-increment)
- `subject_name` - VARCHAR(100) UNIQUE
- `subject_code` - VARCHAR(20) UNIQUE
- `created_at` - TIMESTAMP

**marks**
- `id` - Primary key (auto-increment)
- `student_id` - Foreign key → students(id)
- `subject_id` - Foreign key → subjects(id)
- `marks_obtained` - DECIMAL(5,2)
- `max_marks` - DECIMAL(5,2)
- `exam_date` - DATE
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

## Testing with Postman

1. Import `postman_collection.json` into Postman
2. The collection includes all API endpoints
3. Update the base URL if needed (default: `http://localhost:3000`)
4. Test each endpoint with sample data

## Features Breakdown

### ✅ Task 1: Database Schema Design
- Normalized database with 3 tables
- Foreign key relationships
- Indexes for performance
- CASCADE delete for data integrity

### ✅ Task 2: API CRUD Operations
- Create student
- Get all students
- Get single student with marks
- Update student
- Delete student
- All endpoints tested and working

### ✅ Task 3: API Pagination Logic
- Page and limit parameters
- Metadata (total count, pages, hasNext/hasPrev)
- Search functionality
- Efficient SQL queries

### ✅ Task 4: Frontend Integration
- Bootstrap responsive design
- Form validation
- Paginated list view
- SweetAlert2 confirmations
- Search and filter
- View student details modal
- Edit functionality
- Delete with confirmation

## Screenshots Features

1. **Add/Edit Student Form** - Bootstrap form with validation
2. **Students List** - Paginated table with search
3. **View Details** - Modal showing student info and marks
4. **SweetAlert** - Success/Error/Confirmation alerts
5. **Responsive Design** - Mobile-friendly interface

## Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running
- Check credentials in server.js
- Ensure database exists

### CORS Error
- Backend includes CORS middleware
- Ensure frontend is making requests to correct URL

### Port Already in Use
```bash
# Change port in server.js
const port = 3001; // Use different port
```

## Additional Notes

- The application uses vanilla JavaScript (no React/Vue/Angular)
- Bootstrap CDN is used (no local installation needed)
- SweetAlert2 CDN for beautiful alerts
- Font Awesome for icons
- All data validation on both client and server side

## Future Enhancements

- Authentication and authorization
- Export data to CSV/PDF
- Bulk operations
- Grade calculation
- Report generation
- Email notifications

## License

MIT License - Feel free to use for learning and projects

## Support

For issues or questions, please create an issue in the repository.

---

**Developed as part of Nadsoft Machine Test**
