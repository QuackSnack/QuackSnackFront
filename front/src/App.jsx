import { lazy } from "solid-js";

const Navigation = lazy(() => import("./components/Navigation"));
const Router = lazy(() => import("./components/Router"));

function App() {
  return (
    <div class="app">
      <header>
        <Navigation/>
        <Router/>
      </header>
    </div>
  );
}

export default App;
