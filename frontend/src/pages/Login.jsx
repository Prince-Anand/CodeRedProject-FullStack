import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [role, setRole] = useState('employer'); // 'employer' or 'agent'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login
        login({ email, role, name: 'Test User' });
        navigate(role === 'employer' ? '/dashboard' : '/agent-dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                        Sign in to your account
                    </h2>
                    <div className="mt-6 flex justify-center">
                        <div className="bg-slate-100 p-1 rounded-lg inline-flex">
                            <button
                                onClick={() => setRole('employer')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${role === 'employer'
                                        ? 'bg-white text-primary shadow-sm'
                                        : 'text-slate-500 hover:text-slate-900'
                                    }`}
                            >
                                Employer
                            </button>
                            <button
                                onClick={() => setRole('agent')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${role === 'agent'
                                        ? 'bg-white text-primary shadow-sm'
                                        : 'text-slate-500 hover:text-slate-900'
                                    }`}
                            >
                                Agent
                            </button>
                        </div>
                    </div>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link to="#" className="font-medium text-primary hover:text-primary-light">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Sign in as {role === 'employer' ? 'Employer' : 'Agent'}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-sm text-slate-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-primary hover:text-primary-light">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
