import { Routes, Route,Navigate  } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import { useAuth } from './context/AuthContext';


function App() {

  const { token, role } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/user" element={token && role === 'user' ? <UserPage /> : <Navigate to="/" />}/>
      <Route path="/admin" element={token && role === 'admin' ? <AdminPage /> : <Navigate to="/" />}/>
    </Routes>
  );
}

export default App;