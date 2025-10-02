import { api } from "../lib/api";

export type Checklist = {
  id: number;
  title: string;
  // ...complete com os campos do seu modelo
};

export async function listChecklists() {
  const { data } = await api.get<Checklist[]>("/checklists");
  return data;
}

export async function getChecklist(id: number) {
  const { data } = await api.get<Checklist>(`/checklists/${id}`);
  return data;
}
