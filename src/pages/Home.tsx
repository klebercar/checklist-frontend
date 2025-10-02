import { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { logout } = useAuth();
  const [result, setResult] = useState<string>('');

  async function testarChamada() {
    try {
      // Troque '/checklists' por algum endpoint protegido do seu back
      const r = await api.get('/checklists');
      setResult(`OK ${r.status}: ${JSON.stringify(r.data).slice(0, 200)}...`);
    } catch (e: any) {
      setResult(`Erro: ${e?.response?.status || e.message}`);
    }
  }

  return (
    <div style={{ maxWidth: 860, margin: '60px auto', fontFamily: 'sans-serif' }}>
      <h2>Área Protegida</h2>
      <p>Se você está vendo isso, o login funcionou 🎉</p>

      <div style={{ margin: '16px 0' }}>
        <button onClick={testarChamada} style={{ marginRight: 12 }}>
          Testar chamada protegida
        </button>
        <button onClick={logout}>Sair</button>
      </div>

      {result && (
        <pre style={{ background: '#f4f4f4', padding: 12, borderRadius: 6 }}>
          {result}
        </pre>
      )}
    </div>
  );
}
