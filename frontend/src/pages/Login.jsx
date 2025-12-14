import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [role, setRole] = useState('employer'); // 'employer' or 'agent'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const success = await login({ email, password, role });
        if (success) {
            navigate(role === 'employer' ? '/dashboard' : '/agent-dashboard');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-[var(--color-background)] p-8 rounded-2xl shadow-xl border border-[var(--color-secondary)]/20 relative overflow-hidden">
                {/* Decorative background element if needed, keeping it clean for now */}

                <div className="relative">
                    <h2 className="mt-2 text-center text-4xl font-bold text-[var(--color-primary-dark)] font-serif tracking-tight">
                        Sign in to your account
                    </h2>

                    {/* Role Toggle */}
                    <div className="mt-8 flex justify-center">
                        <div className="bg-[var(--color-secondary)]/30 p-1.5 rounded-full inline-flex relative w-full max-w-xs">
                            <button
                                type="button"
                                onClick={() => setRole('employer')}
                                className={`flex-1 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${role === 'employer'
                                    ? 'bg-[var(--color-primary)] text-white shadow-md'
                                    : 'text-[var(--color-primary-dark)] hover:bg-[var(--color-secondary)]/20'
                                    }`}
                            >
                                Employer
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('agent')}
                                className={`flex-1 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${role === 'agent'
                                    ? 'bg-[var(--color-primary)] text-white shadow-md'
                                    : 'text-[var(--color-primary-dark)] hover:bg-[var(--color-secondary)]/20'
                                    }`}
                            >
                                Agent
                            </button>
                        </div>
                    </div>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
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
                                className="appearance-none block w-full px-6 py-3.5 border border-[var(--color-primary)]/30 placeholder-[var(--color-primary)]/50 text-[var(--color-primary-dark)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all shadow-sm mb-4"
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
                                className="appearance-none block w-full px-6 py-3.5 border border-[var(--color-primary)]/30 placeholder-[var(--color-primary)]/50 text-[var(--color-primary-dark)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all shadow-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-[var(--color-secondary)] rounded bg-transparent"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-[var(--color-primary-dark)]">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link to="#" className="font-medium text-[var(--color-primary-dark)] hover:text-[var(--color-primary)] underline decoration-[var(--color-secondary)] underline-offset-4">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            Sign in as {role === 'employer' ? 'Employer' : 'Agent'}
                        </button>
                    </div>
                </form>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 mx-2" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <div className="text-center mt-6">
                    <p className="text-sm text-[var(--color-primary-dark)]">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
