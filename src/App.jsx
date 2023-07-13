import "./App.css";
import AuthPage from "./components/AuthPage";
import { Route, useLocation, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
function App() {
  const location = useLocation()
  return (
    <>
      {location.pathname === "/dashboard" ? <h1>Dashboard</h1> : <h1>Firebase Demo</h1>}
      <div>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
