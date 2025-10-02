import React, { useState } from 'react';
import { api } from '../services/api';
import { saveToken } from '../utils/auth';

export default function Login() {
  const [username, setUsername] = useState('admin@hotel.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const payload = { username, password };
      const { data } = await api.post('/api/auth/login', payload);

      // Backend pode devolver token com chaves diferentes. Tentamos todas:
      const token =
        data?.token ||
        data?.accessToken ||
        data?.jwt ||
        data?.access_token;

      if (!token) {
        throw new Error('Token não encontrado na resposta do backend.');
      }

      saveToken(token);
      alert('Login OK! Token salvo. Agora as chamadas protegidas enviarão o Bearer.');
      // redirecione para a home/dashboard caso tenha rota:
      // navigate('/');
    } catch (err: any) {
      console.error(err);
      setError('Falha no login');
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Entrar</h2>

      <p style={{ fontSize: 13, color: '#444' }}>
        Base URL da API: <b>{baseUrl}</b>
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>E-mail (ou usuário)</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: 8 }}
            placeholder="admin@hotel.com"
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: 8 }}
            placeholder="••••••••"
          />
        </div>

        {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}

        <button type="submit" style={{ padding: '8px 16px' }}>
          Entrar
        </button>
      </form>
    </div>
  );
}
