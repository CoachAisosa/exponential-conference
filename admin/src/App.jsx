import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Registrations from "./pages/Registrations";
import Payments from "./pages/Payments";
import News from "./pages/News";
import Speakers from "./pages/Speakers";
import Programme from "./pages/Programme";
import Contacts from "./pages/Contacts";
import Admins from "./pages/Admins";
import Settings from "./pages/Settings";
import Trainings from "./pages/Trainings";   

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/registrations" element={<Registrations />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/trainings" element={<Trainings />} /> 
        <Route path="/news" element={<News />} />
        <Route path="/speakers" element={<Speakers />} />
        <Route path="/programme" element={<Programme />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;