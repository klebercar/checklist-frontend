import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function ApiPing() {
  const [status, setStatus] = useState('Carregando...');

  useEffect(() => {
    api.get('/v3/api-docs')
      .then(() => setStatus('✅ Backend acessível'))
      .catch((err) => setStatus('❌ Erro ao acessar o backend: ' + (err?.message || '')));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Teste de Conexão com Backend</h1>
      <p>{status}</p>
      <p><strong>Base URL:</strong> {import.meta.env.VITE_API_BASE_URL}</p>
    </div>
  );
}
