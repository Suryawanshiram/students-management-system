import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const FormModal = ({ show, handleClose, fetchStudents }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState({});

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";

    if (!age) newErrors.age = "Age is required";
    else if (age < 1 || age > 120) newErrors.age = "Age must be between 1–120";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await axios.post(`${BASE_URL}/student`, {
        name,
        email,
        age: Number(age),
      });

      fetchStudents(1); // Refresh table
      handleClose(); // Close modal
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Member</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* NAME */}
          <Form.Group className="mb-3">
            <Form.Label>Member Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Enter member name"
              onChange={(e) => setName(e.target.value)}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          {/* EMAIL */}
          <Form.Group className="mb-3">
            <Form.Label>Member Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {/* AGE */}
          <Form.Group className="mb-3">
            <Form.Label>Member Age</Form.Label>
            <Form.Control
              type="number"
              value={age}
              placeholder="Enter age"
              onChange={(e) => setAge(e.target.value)}
              isInvalid={!!errors.age}
            />
            <Form.Control.Feedback type="invalid">
              {errors.age}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button variant="success" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormModal;
