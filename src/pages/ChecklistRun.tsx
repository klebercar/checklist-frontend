import { useEffect, useState } from 'react';
import api from '../api/axios';
import CameraCapture from '../components/CameraCapture';
export default function ChecklistRun(){
  const [checklist,setChecklist]=useState<any>(); const [items,setItems]=useState<any[]>([]);
  const id = new URLSearchParams(location.search).get('id');
  useEffect(()=>{ (async()=>{ const {data}=await api.get(`/checklists/${id}`); setChecklist(data); setItems(data.items||[]); })(); },[id]);
  async function toggle(item:any){ const {data}=await api.post(`/checklists/${id}/items/${item.id}/toggle`,{checked:!item.checked,note:item.note||''}); setItems(prev=>prev.map(i=>i.id===item.id?data:i)); }
  async function onPhoto(file:File){ const form=new FormData(); form.append('checklistId', String(id)); form.append('file', file); await api.post('/photos/upload', form, { headers:{'Content-Type':'multipart/form-data'} }); alert('Foto enviada!'); }
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Checklist #{id}</h1>
      <ul className="space-y-2">
        {items.map(it=> (
          <li key={it.id} className="flex items-center gap-2 p-2 border rounded">
            <input type="checkbox" checked={it.checked} onChange={()=>toggle(it)} />
            <span className={it.required? 'font-semibold':''}>{it.label}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <h2 className="font-semibold mb-2">Fotos</h2>
        <CameraCapture onCapture={onPhoto}/>
      </div>
      <button className="btn-primary mt-6" onClick={async()=>{ await api.post(`/checklists/${id}/finish`); alert('Checklist finalizado!'); }}>Finalizar</button>
    </div>
  );
}
