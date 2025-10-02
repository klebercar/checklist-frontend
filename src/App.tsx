import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ChecklistStart from './pages/ChecklistStart';
import ChecklistRun from './pages/ChecklistRun';
import AdminTemplates from './pages/AdminTemplates';
import { useAuth } from './store/auth';

function Nav(){
  const {role,logout,name}=useAuth(); const nav=useNavigate();
  return (
    <div className="p-3 flex gap-3 items-center border-b">
      <Link to="/">Home</Link>
      {role==='ADMIN' && <Link to="/admin/templates">Templates</Link>}
      <div className="ml-auto flex items-center gap-3">
        <span>{name}</span>
        <button className="btn-outline" onClick={()=>{logout(); nav('/login');}}>Sair</button>
      </div>
    </div>
  );
}

export default function App(){
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<><Nav/><Dashboard/></>} />
      <Route path="/checklist/start" element={<><Nav/><ChecklistStart/></>} />
      <Route path="/checklist/run" element={<><Nav/><ChecklistRun/></>} />
      <Route path="/admin/templates" element={<><Nav/><AdminTemplates/></>} />
    </Routes>
  );
}
