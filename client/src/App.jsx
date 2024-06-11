import { Routes, Route } from "react-router-dom";
import Tasks from "./pages/Tasks";

import "./App.css";

const App = () => {
    return (
        <Routes>
            <Route path="/" Component={Tasks} />
        </Routes>
    );
};

export default App;
