import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [searchParams] = useSearchParams();
    const [role, setRole] = useState('employer');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const { register } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const roleParam = searchParams.get('role');
        if (roleParam === 'agent') {
            setRole('agent');
        }
    }, [searchParams]);

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        const success = await register({ ...formData, role }); // Actually using login from context which was assigned to register if we followed that path, but wait, I added 'register' to context.
        // Wait, in Register.jsx line 14: const { login } = useAuth();
        // I need to change this to const { register } = useAuth();
        if (success) {
            navigate(role === 'employer' ? '/dashboard' : '/agent-dashboard');
        } else {
            setError('Registration failed. Try again.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-[var(--color-background)] p-8 rounded-2xl shadow-xl border border-[var(--color-secondary)]/20 relative overflow-hidden">
                <div className="relative">
                    <h2 className="mt-2 text-center text-4xl font-bold text-[var(--color-primary-dark)] font-serif tracking-tight">
                        Create your account
                    </h2>

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

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="appearance-none block w-full px-6 py-3.5 border border-[var(--color-primary)]/30 placeholder-[var(--color-primary)]/50 text-[var(--color-primary-dark)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all shadow-sm"
                                placeholder="Full Name"
                            />
                        </div>
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
                                value={formData.email}
                                onChange={handleChange}
                                className="appearance-none block w-full px-6 py-3.5 border border-[var(--color-primary)]/30 placeholder-[var(--color-primary)]/50 text-[var(--color-primary-dark)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all shadow-sm"
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
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="appearance-none block w-full px-6 py-3.5 border border-[var(--color-primary)]/30 placeholder-[var(--color-primary)]/50 text-[var(--color-primary-dark)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all shadow-sm"
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="appearance-none block w-full px-6 py-3.5 border border-[var(--color-primary)]/30 placeholder-[var(--color-primary)]/50 text-[var(--color-primary-dark)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all shadow-sm"
                                placeholder="Confirm Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            Sign up as {role === 'employer' ? 'Employer' : 'Agent'}
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
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
