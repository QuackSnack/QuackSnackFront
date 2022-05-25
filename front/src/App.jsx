import { lazy } from "solid-js";

const Navigation = lazy(() => import("./components/Navigation"));
const Page = lazy(() => import("./components/Page"));

function App() {
  return (
    <div class="app">
      <header>
        <Navigation/>
        <Page/>
      </header>
    </div>
  );
}

export default App;
