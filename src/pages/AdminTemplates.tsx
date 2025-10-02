import { useEffect, useState } from 'react';
import api from '../api/axios';
export default function AdminTemplates(){
  const [templates,setTemplates]=useState<any[]>([]);
  const [name,setName]=useState('Quarto — Padrão');
  const [items,setItems]=useState<string[]>(['Troca de lençol','Limpeza do banheiro','Aspiração do piso']);
  useEffect(()=>{ (async()=>{ const {data}=await api.get('/templates'); setTemplates(data);} )(); },[]);
  function addItem(){ setItems(prev=>[...prev,'Novo item']); }
  async function create(){ const payload={ name, items: items.map(i=>({label:i, required:true})) }; await api.post('/templates', payload); const {data}=await api.get('/templates'); setTemplates(data); }
  return (
    <div className="p-4 max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
      <div className="card space-y-2">
        <h2 className="font-semibold">Novo Template</h2>
        <input className="input" value={name} onChange={e=>setName(e.target.value)} />
        {items.map((it,idx)=> (
          <input key={idx} className="input" value={it} onChange={e=>{ const v=[...items]; v[idx]=e.target.value; setItems(v);} } />
        ))}
        <div className="flex gap-2">
          <button className="btn-outline" onClick={addItem}>+ Item</button>
          <button className="btn-primary" onClick={create}>Salvar</button>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="font-semibold">Templates</h2>
        {templates.map((t:any)=> (
          <div key={t.id} className="card">
            <div className="font-semibold">{t.name}</div>
            <ul className="list-disc ml-5">
              {(t.items||[]).map((i:any)=> <li key={i.id}>{i.label}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
