/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from "solid-app-router";

import "./css/main.css";
import App from './App';

render(
    () => (
        <Router>
            <App />
        </Router>
    ),
    document.getElementById('root')
);
