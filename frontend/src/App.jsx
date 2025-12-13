import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AgentSearch from './pages/AgentSearch';
import AgentProfile from './pages/AgentProfile';
import JobBoard from './pages/JobBoard';
import Dashboard from './pages/Dashboard';
import AgentDashboard from './pages/AgentDashboard';
import Chat from './pages/Chat';
import AdminDashboard from './pages/AdminDashboard';
import Support from './pages/Support';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/agents" element={<AgentSearch />} />
              <Route path="/agent/:id" element={<AgentProfile />} />
              <Route path="/jobs" element={<JobBoard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/agent-dashboard" element={<AgentDashboard />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/support" element={<Support />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
