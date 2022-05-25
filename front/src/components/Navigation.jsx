import { Link } from "solid-app-router"
import { Navbar, Container, Nav } from "solid-bootstrap"

function Navigation() {
    return (
        <div>
            <Navbar bg="dark" variant="dark" class="fd-navbar">
                <Container>
                    <Navbar.Brand href="/home">Food Distribution</Navbar.Brand>
                    <Nav class="me-auto">
                        <Nav.Link href="/login">Log in</Nav.Link>
                        <Nav.Link href="/signup">Sign up</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default Navigation;
