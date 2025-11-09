import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import PrescriptionList from './components/PrescriptionList';
import PrescriptionForm from './components/PrescriptionForm';
import Report from './components/Report';
import NavBar from './components/NavBar';
import DrugInteractions from './components/DrugInteractions';

// Simple protected route wrapper
const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('auth_token');
    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/prescriptions" element={<PrivateRoute><PrescriptionList /></PrivateRoute>} />
          <Route path="/prescriptions/new" element={<PrivateRoute><PrescriptionForm /></PrivateRoute>} />
          <Route path="/prescriptions/edit/:id" element={<PrivateRoute><PrescriptionForm /></PrivateRoute>} />
          <Route path="/report" element={<PrivateRoute><Report /></PrivateRoute>} />
          <Route path="/interactions" element={<PrivateRoute><DrugInteractions /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/prescriptions" />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;