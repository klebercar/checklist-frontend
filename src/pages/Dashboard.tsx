import { Link } from 'react-router-dom';
export default function Dashboard(){
  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Checklist de Limpeza</h1>
      <div className="grid sm:grid-cols-2 gap-3">
        <Link className="card" to="/checklist/start">Iniciar Checklist</Link>
        <Link className="card" to="/admin/templates">Templates (Admin)</Link>
      </div>
    </div>
  );
}
