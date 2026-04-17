import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api/axios';

export interface Project {
  id: string;
  name: string;
  color: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: string[];
}

export default function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projRes, colRes] = await Promise.all([
          api.get('/projects'),
          api.get('/columns'),
        ]);

        setProjects(projRes.data);
        setColumns(colRes.data);
      } catch {
        setError('Erreur chargement');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function addProject(name: string, color: string) {
    setError(null);

    try {
      const { data } = await api.post('/projects', { name, color });
      setProjects((prev) => [...prev, data]);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Erreur: ${err.response?.status ?? 'inconnue'}`);
      } else {
        setError('Erreur ajout projet');
      }
    }
  }

  async function renameProject(project: Project) {
    const newName = prompt('Nouveau nom :', project.name);

    if (!newName || newName.trim() === '' || newName.trim() === project.name) {
      return;
    }

    try {
      const { data } = await api.put(`/projects/${project.id}`, {
        ...project,
        name: newName.trim(),
      });

      setProjects((prev) => prev.map((p) => (p.id === data.id ? data : p)));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Erreur: ${err.response?.status ?? 'inconnue'}`);
      } else {
        setError('Erreur renommage projet');
      }
    }
  }

  async function deleteProject(id: string) {
    const ok = confirm('Êtes-vous sûr ?');
    if (!ok) return;

    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Erreur: ${err.response?.status ?? 'inconnue'}`);
      } else {
        setError('Erreur suppression projet');
      }
    }
  }

  return {
    projects,
    columns,
    loading,
    error,
    addProject,
    renameProject,
    deleteProject,
  };
}