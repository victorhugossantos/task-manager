import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try { 
            await api.post('/auth/register', {name, email, password});
            navigate('/login');
            
        } catch (error) {
            setError(error.response?.data?.error ||  'Erro ao registrar')

        }
    };

    return (
        <div className="register-container">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome"
                    required
                />
                 <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                    required
                />
                 <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Registrar</button>

            </form>
        </div>
    )
}

export default Register;
