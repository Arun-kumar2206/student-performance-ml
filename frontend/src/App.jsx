import { Routes, Route, Link } from "react-router-dom";
import StudentForm from "./components/StudentForm";
import Monitoring from "./pages/Monitoring";

function App() {
  return (
    <div>
      <nav style={{ padding: 10 }}>
        <Link to="/" style={{ marginRight: 10 }}>Prediction</Link>
        <Link to="/monitoring">Monitoring</Link>
      </nav>

      <Routes>
        <Route path="/" element={<StudentForm />} />
        <Route path="/monitoring" element={<Monitoring />} />
      </Routes>
    </div>
  );
}

export default App;
