import { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

interface Project {
  id: string;
  name: string;
  color: string;
}

interface SidebarProps {
  projects: Project[];
  isOpen: boolean;
}

function Sidebar({ projects, isOpen }: SidebarProps) {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <h2 className={styles.title}>Mes Projets</h2>
      <ul className={styles.list}>
        {projects.map((p) => (
          <li key={p.id} className={styles.item}>
            <Link
              to={`/projects/${p.id}`}
              className={styles.link}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <span className={styles.dot} style={{ background: p.color }} />
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default memo(Sidebar);