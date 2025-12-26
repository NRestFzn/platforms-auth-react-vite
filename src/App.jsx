import './App.css';
import {Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import 'react-toastify/dist/ReactToastify.css';
import GoogleSync from './pages/Google/Sync';
import FacebookSync from './pages/Facebook/Sync';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/google/sync" element={<GoogleSync />} />
        <Route path="/auth/facebook/sync" element={<FacebookSync />} />
      </Routes>
    </>
  );
}

export default App;
