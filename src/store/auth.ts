import { create } from 'zustand';
interface AuthState { token?:string; role?:string; name?:string; setAuth:(t:string,r:string,n:string)=>void; logout:()=>void }
export const useAuth = create<AuthState>((set)=>({
  token: localStorage.getItem('token')||undefined,
  role: localStorage.getItem('role')||undefined,
  name: localStorage.getItem('name')||undefined,
  setAuth:(t,r,n)=>{ localStorage.setItem('token',t); localStorage.setItem('role',r); localStorage.setItem('name',n); set({token:t,role:r,name:n}); },
  logout:()=>{ localStorage.clear(); set({token:undefined,role:undefined,name:undefined}); }
}));
