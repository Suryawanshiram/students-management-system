import { Modal, Button } from "react-bootstrap";
import { ExclamationTriangleFill } from "react-bootstrap-icons";

const DeleteModal = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Body className="text-center p-4">
        <div className="d-flex justify-content-center mb-3">
          <ExclamationTriangleFill
            size={50}
            color="#f4c542"
            style={{ background: "#fff3cd", borderRadius: "50%", padding: 10 }}
          />
        </div>

        <h4 className="fw-bold">Are you sure?</h4>

        <p className="text-muted mt-2" style={{ fontSize: "15px" }}>
          If you delete this Member then this action <br />
          cannot be undone.
        </p>

        <div className="d-flex justify-content-center gap-2 mt-4">
          <Button variant="primary" onClick={handleConfirm}>
            Yes, delete it!
          </Button>

          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
