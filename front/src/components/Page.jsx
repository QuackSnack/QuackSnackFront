import { lazy } from "solid-js";
import { Routes, Route } from "solid-app-router"

const Home = lazy(() => import("../components/Home"));
const Login = lazy(() => import("../components/Login"));
const Signup = lazy(() => import("../components/Signup"));

function Page() {
    return (
        <div class="page">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </div>
    );
}

export default Page;