import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/axios';
import Header from '../components/Header';
import styles from './ProjectDetail.module.css';
import type { RootState, AppDispatch } from '../store';
import { logout } from '../features/Auth/authSlice';

interface Project {
  id: string;
  name: string;
  color: string;
}

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch(() => navigate('/dashboard'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleBackToDashboard = useCallback(() => {
    navigate('/dashboard');
  }, [navigate]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  if (!project) {
    return null;
  }

  return (
    <div className={styles.layout}>
      <Header
        title="TaskFlow"
        onMenuClick={handleBackToDashboard}
        userName={user?.name}
        onLogout={handleLogout}
      />

      <main className={styles.main}>
        <div className={styles.header}>
          <span
            className={styles.dot}
            style={{ background: project.color }}
          />
          <h2>{project.name}</h2>
        </div>

        <p className={styles.info}>Projet ID: {project.id}</p>
      </main>
    </div>
  );
}