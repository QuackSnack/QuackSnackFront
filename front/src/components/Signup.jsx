import { FloatingLabel, Form, Button, Row, Col, Modal } from "solid-bootstrap"

function Signup(props) {
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
          <h4>Sign up</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form>
          <Row class="g-2 mb-3">
            <Col md>
              <FloatingLabel label="First name">
                <Form.Control placeholder />
              </FloatingLabel>
            </Col>

            <Col md>
              <FloatingLabel label="Last name">
                <Form.Control placeholder/>
              </FloatingLabel>
            </Col>
          </Row>

          <Row class="g-2 mb-3">
            <Col md>
              <FloatingLabel label="Country">
                <Form.Control placeholder />
              </FloatingLabel>
            </Col>

            <Col md>
              <FloatingLabel label="Town">
                <Form.Control placeholder/>
              </FloatingLabel>
            </Col>
          </Row>

          <FloatingLabel label="Street" class="mb-3">
            <Form.Control placeholder/>
          </FloatingLabel>

          <Row class="g-2 mb-3">
            <Col md>
              <FloatingLabel label="Username">
                <Form.Control placeholder />
              </FloatingLabel>
            </Col>

            <Col md>
              <FloatingLabel label="Email address">
                <Form.Control placeholder/>
              </FloatingLabel>
            </Col>
          </Row>

          <Form.Select aria-label="Default select example" class="mb-3">
            <option value="1">Client</option>
            <option value="2">Restaurant</option>
          </Form.Select>

          <Row class="g-2 mb-3">
            <Col md>
              <FloatingLabel label="Password">
                <Form.Control placeholder type="password"/>
              </FloatingLabel>
            </Col>

            <Col md>
              <FloatingLabel label="Repeat password">
                <Form.Control placeholder type="password"/>
              </FloatingLabel>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" type="submit">Register</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Signup;
