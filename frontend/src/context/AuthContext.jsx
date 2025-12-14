import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { name, email, role: 'employer' | 'agent' }

    const login = async (userData) => {
        try {
            const res = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Login failed');

            setUser(data.user);
            localStorage.setItem('token', data.token);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const register = async (userData) => {
        try {
            const res = await fetch('http://localhost:5000/register', {
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
            return false;
        }
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:5000/signout', { method: 'POST' });
        } catch (err) {
            console.error('Logout error:', err);
        }
        setUser(null);
        localStorage.removeItem('token');
    };

    // Check if user is logged in on mount
    // useEffect(() => {
    //    checkAuth();
    // }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
