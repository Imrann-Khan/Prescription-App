import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

export default function Login() {
    const [creds, setCreds] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        // Create Basic Auth token manually
        const token = btoa(`${creds.username}:${creds.password}`);
        try {
            // Test credentials against backend
            await api.get('/auth/login', {
                headers: { 'Authorization': `Basic ${token}` }
            });
            // If successful, save token and redirect
            localStorage.setItem('auth_token', token);
            navigate('/prescriptions');
            window.location.reload();
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="col-md-4 mx-auto mt-5">
             <h3>Login</h3>
             {error && <div className="alert alert-danger">{error}</div>}
             <form onSubmit={handleLogin}>
                 <div className="mb-3">
                     <label>Username</label>
                     <input type="text" className="form-control" 
                            onChange={e => setCreds({...creds, username: e.target.value})}/>
                 </div>
                 <div className="mb-3">
                     <label>Password</label>
                     <input type="password" className="form-control" 
                            onChange={e => setCreds({...creds, password: e.target.value})}/>
                 </div>
                 <button className="btn btn-primary w-100">Login</button>
             </form>
        </div>
    );
}