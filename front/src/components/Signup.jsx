import { FloatingLabel, Form, Button, Row, Col } from "solid-bootstrap"

function Signup() {
  return (
    <div>
      <div>
        <h1 class="page-title">Log in page</h1>
        <div class="frame-no-border">
          <Form autocomplete="off">
            <Row class="mb-2">
              <Form.Group as={Col} controlId="first_name">
                <FloatingLabel label="First name">
                  <Form.Control />
                </FloatingLabel>
              </Form.Group>

              <Form.Group as={Col} controlId="last_name">
                <FloatingLabel label="Last name">
                  <Form.Control />
                </FloatingLabel>
              </Form.Group>
            </Row>

            <Row class="mb-2">
              <Form.Group as={Col} md="4" controlId="country">
                <FloatingLabel label="Country" class="mb-3">
                  <Form.Control />
                </FloatingLabel>
              </Form.Group>

              <Form.Group as={Col} md="8" controlId="town">
                <FloatingLabel label="Town" class="mb-3">
                  <Form.Control />
                </FloatingLabel>
              </Form.Group>
            </Row>

            <Form.Group as={Col} controlId="street">
              <FloatingLabel label="Street" class="mb-3">
                <Form.Control />
              </FloatingLabel>
            </Form.Group>

            <Row class="mb-2">
              <Form.Group as={Col} controlId="username">
                <FloatingLabel label="Username" class="mb-3">
                  <Form.Control />
                </FloatingLabel>
              </Form.Group>

              <Form.Group as={Col} controlId="email">
                <FloatingLabel label="Email address" class="mb-3">
                  <Form.Control />
                </FloatingLabel>
              </Form.Group>
            </Row>

            <Form.Group as={Col} controlId="password">
              <FloatingLabel label="Password" class="mb-3">
                <Form.Control type="password" />
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col} controlId="r_password">
              <FloatingLabel label="Repeat password" class="mb-3">
                <Form.Control type="password" />
              </FloatingLabel>
            </Form.Group>

            <Button variant="outline-secondary" type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
