import { lazy } from "solid-js";

const Navigation = lazy(() => import("./components/Navigation"));
const Page = lazy(() => import("./components/Page"));

function App() {
  return (
    <div>
      <header>
        <h1>Pages</h1>
        <Navigation/>
        <Page/>
      </header>
    </div>
  );
}

export default App;
