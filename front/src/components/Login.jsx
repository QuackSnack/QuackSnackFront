import { FloatingLabel, Form, Button, Modal } from "solid-bootstrap"

function Login(props) {

  return (
    <Modal
      show={props.show()}
      onHide={() => props.setShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>Log in</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form autocomplete="off">
          <FloatingLabel controlId="floatingInput" label="Email address" class="mb-3">
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password" class="mb-3">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" type="submit">Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Login;
