import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ProjectForm from '../components/ProjectForm';
import styles from './Dashboard.module.css';
import HeaderMUI from '../components/HeaderMUI';
import type { RootState, AppDispatch } from '../store';
import { logout } from '../features/Auth/authSlice';
import useProjects from '../hooks/useProjects';

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const { projects, columns, loading, error, addProject } = useProjects();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const handleMenuClick = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleShowForm = useCallback(() => {
    setShowForm(true);
  }, []);

  const handleCancelForm = useCallback(() => {
    setShowForm(false);
  }, []);

  const handleCreateProject = useCallback(
    async (name: string, color: string) => {
      await addProject(name, color);
      setShowForm(false);
    },
    [addProject]
  );

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  return (
    <div className={styles.layout}>
      <HeaderMUI
        title="TaskFlow"
        onMenuClick={handleMenuClick}
        userName={user?.name}
        onLogout={handleLogout}
      />

      <div className={styles.body}>
        <Sidebar projects={projects} isOpen={sidebarOpen} />

        <div className={styles.content}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.toolbar}>
            {!showForm ? (
              <button className={styles.addBtn} onClick={handleShowForm}>
                + Nouveau projet
              </button>
            ) : (
              <ProjectForm
                submitLabel="Créer"
                onSubmit={handleCreateProject}
                onCancel={handleCancelForm}
              />
            )}
          </div>

          <MainContent columns={columns} />
        </div>
      </div>
    </div>
  );
}