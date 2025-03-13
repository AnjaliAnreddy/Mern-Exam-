import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Polls from "./components/Polls";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Polls />} />
            </Routes>
        </Router>
    );
}

export default App;
