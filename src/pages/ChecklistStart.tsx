import { useEffect, useState } from 'react';
import api from '../api/axios';
export default function ChecklistStart(){
  const [rooms,setRooms]=useState<any[]>([]); const [templates,setTemplates]=useState<any[]>([]);
  const [roomId,setRoomId]=useState(''); const [templateId,setTemplateId]=useState('');
  useEffect(()=>{ (async()=>{ const r=await api.get('/rooms').catch(()=>({data:[]})); setRooms(r.data||[]);
    const t=await api.get('/templates').catch(()=>({data:[]})); setTemplates(t.data||[]); })(); },[]);
  return (
    <div className="p-4 max-w-lg mx-auto card space-y-3">
      <h2 className="font-semibold">Nova Limpeza</h2>
      <select className="input" value={roomId} onChange={e=>setRoomId(e.target.value)}>
        <option value="">Selecione o quarto</option>
        {rooms.map((r:any)=> <option key={r.id} value={r.id}>{r.code}</option>)}
      </select>
      <select className="input" value={templateId} onChange={e=>setTemplateId(e.target.value)}>
        <option value="">Selecione o template</option>
        {templates.map((t:any)=> <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>
      <button className="btn-primary" onClick={async()=>{ const {data}=await api.post('/checklists',{roomId:Number(roomId),templateId:Number(templateId)}); location.href=`/checklist/run?id=${data.id}`; }}>Começar</button>
    </div>
  );
}
