import React, {useState} from "react";
import {useNavigate } from 'react-router-dom'
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth;
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/login', {email, password});
            login(response.data.user, response.data.token);
            navigate('/dashboard');
        } catch (error) {
            setError('Crendenciais invalidadas')
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    requeired
                />
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    requeired
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Entrar</button>

            </form>
        </div>
    )

}

export default Login;