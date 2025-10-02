import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../store/auth';
export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const setAuth=useAuth(s=>s.setAuth);
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form className="w-full max-w-sm space-y-3 card" onSubmit={async e=>{e.preventDefault(); const {data}=await api.post('/auth/login',{email,password}); setAuth(data.token,data.role,data.name); location.href='/'; }}>
        <h1 className="text-2xl font-bold">Entrar</h1>
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input className="input" placeholder="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <button className="btn-primary w-full">Entrar</button>
      </form>
    </div>
  );
}
