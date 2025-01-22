import { Button, Modal } from "react-bootstrap";

interface DeleteProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  handleDelete: () => void;
}

const DeleteModal = (props: DeleteProps) => {
  return (
    <Modal show={props.show} onHide={props.handleClose} size="sm" centered>
      <Modal.Body>{props.title}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={props.handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
