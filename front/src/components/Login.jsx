import { FloatingLabel, Form, Button } from "solid-bootstrap"

function Login() {
  return (
    <div>
      <h1 class="page-title">Log in page</h1>
      <div class="frame-no-border">
        <Form autocomplete="off">
          <FloatingLabel controlId="floatingInput" label="Email address" class="mb-3">
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password" class="mb-3">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <Button variant="outline-secondary" type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
