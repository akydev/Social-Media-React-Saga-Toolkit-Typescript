import { Button, Modal } from "react-bootstrap";

interface DeleteProps {
  show: boolean;
  handleClose: () => void;
}

const DeleteModal = (props: DeleteProps) => {
  return (
    <Modal show={props.show} onHide={props.handleClose} size="sm" centered>
      <Modal.Body>Are you sure to delete this post!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={props.handleClose}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
