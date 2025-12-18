import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import AgentSearch from './pages/AgentSearch';
import AgentProfile from './pages/AgentProfile';
import JobBoard from './pages/JobBoard';
import Dashboard from './pages/Dashboard';
import AgentDashboard from './pages/AgentDashboard';
import Chat from './pages/Chat';
import AdminDashboard from './pages/AdminDashboard';
import ManageProfile from './pages/ManageProfile';
import PostJob from './pages/PostJob';
import JobApplicants from './pages/JobApplicants';
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
              <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['employer', 'admin']}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/agent-dashboard" element={
                <ProtectedRoute allowedRoles={['agent', 'admin']}>
                  <AgentDashboard />
                </ProtectedRoute>
              } />
              <Route path="/chat" element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ManageProfile />
                </ProtectedRoute>
              } />
              <Route path="/post-job" element={
                <ProtectedRoute allowedRoles={['employer', 'admin']}>
                  <PostJob />
                </ProtectedRoute>
              } />
              <Route path="/job/:id/applicants" element={
                <ProtectedRoute allowedRoles={['employer', 'admin']}>
                  <JobApplicants />
                </ProtectedRoute>
              } />
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
