import { Navbar, Container, Nav } from "solid-bootstrap"
import { Button } from "solid-bootstrap-core";
import { createSignal } from "solid-js"
import Login from "./Login";
import Signup from "./Signup";

const [login, setLogin] = createSignal(false);
const [signup, setSignup] = createSignal(false);

function Navigation() {
    return (
        <div>
            <Navbar bg="dark" variant="dark" class="fd-navbar">
                <Container>
                    <Navbar.Brand href="/home"><b>Food Distribution</b></Navbar.Brand>
                    <Nav class="me-auto">
                        <Button class="nav-button" onClick={() => setLogin(true)}>Log in</Button>
                        <Login show={login} setShow={setLogin}/>
                        
                        <Button class="nav-button" onClick={() => setSignup(true)}>Sign up</Button>
                        <Signup show={signup} setShow={setSignup}/>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default Navigation;
