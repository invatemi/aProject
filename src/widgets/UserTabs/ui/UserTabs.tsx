import { NavLink } from "react-router-dom";
import { UserTabsProps } from "../lib";
import styles from "./UserTabs.module.css";

const UserTabs = ({ userId, theme }: UserTabsProps) => {
  if (!userId || isNaN(userId)) return null;

  const tabs = [
    { to: `/users/${userId}/posts`, label: "📝 Посты", end: true },
    { to: `/users/${userId}/albums`, label: "🖼️ Альбомы", end: false },
    { to: `/users/${userId}/todos`, label: "✅ Задачи", end: false },
  ];

  const containerClass = theme === "dark" 
    ? `${styles.container} ${styles.containerDark}` 
    : styles.container;

  const getTabClassName = ({ isActive }: { isActive: boolean }): string => {
    const baseClasses = `${styles.tabLink} ${
      theme === "dark" ? styles.tabLinkDark : ""
    }`;
    return isActive ? `${baseClasses} ${styles.active}` : baseClasses;
  };

  return (
    <nav className={containerClass} aria-label="Навигация профиля пользователя">
      <ul className={styles.tabsList}>
        {tabs.map((tab) => (
          <li key={tab.to} className={styles.tabItem}>
            <NavLink
              to={tab.to}
              end={tab.end}
              className={getTabClassName}
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  {tab.label}
                  {isActive && (
                    <span className={styles.activeIndicator} aria-hidden="true" />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default UserTabs