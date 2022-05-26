import { lazy } from "solid-js";
import { Routes, Route } from "solid-app-router"

const Home = lazy(() => import("./Home"));
const Login = lazy(() => import("./Login"));
const Signup = lazy(() => import("./Signup"));

function Page() {
    return (
        <div class="page">
            <Routes>
                <Route path="/*" element={<Home />} />
            </Routes>
        </div>
    );
}

export default Page;