import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { name, email, role: 'employer' | 'agent' }

    const login = async (userData) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Login failed');

            setUser(data.user);
            localStorage.setItem('token', data.token);
            return data.user; // Return user to help redirect
        } catch (err) {
            console.error(err);
            throw err; // Throw error to be caught by component
        }
    };

    const register = async (userData) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Registration failed');

            setUser(data.user);
            localStorage.setItem('token', data.token);
            return true;
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:5000/api/auth/signout', { method: 'POST' });
        } catch (err) {
            console.error('Logout error:', err);
        }
        setUser(null);
        localStorage.removeItem('token');
    };

    // Check if user is logged in on mount
    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await fetch('http://localhost:5000/api/auth/me', {
                method: 'GET',
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json'
                },
            });
            const data = await res.json();
            if (res.ok) {
                setUser(data);
            } else {
                localStorage.removeItem('token');
                setUser(null);
            }
        } catch (err) {
            console.error('Auth check failed:', err);
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
