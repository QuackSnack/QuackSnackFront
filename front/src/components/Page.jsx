import { lazy } from "solid-js";
import { Routes, Route } from "solid-app-router"

const Home = lazy(() => import("../views/Home"));
const Login = lazy(() => import("../views/Login"));
const Signup = lazy(() => import("../views/Signup"));

function Page() {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </div>
    );
}

export default Page;