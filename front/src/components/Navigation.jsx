import { lazy } from "solid-js";
import { Link } from "solid-app-router"

function Navigation() {
    return (
        <div>
            <nav>
                <Link href="/login">Log in</Link>
                <Link href="/signup">Sign up</Link>
                <Link href="/home">Home</Link>
            </nav>
        </div>
    );
}

export default Navigation;
