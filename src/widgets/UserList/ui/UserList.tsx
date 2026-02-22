import { memo, useMemo } from "react";
import { UserCard } from "@/entities";
import { IUserListProps } from "../lib";
import styles from "./UserList.module.css";

const UserList = memo(({ theme, users, onUserClick }: IUserListProps) => {

  const renderedUsers = useMemo(() => 
    users.map(user => (
      <li key={user.id} className={styles.item}>
        <UserCard 
          {...user} 
          theme={theme}
          onClick={onUserClick}
        />
      </li>
    )), 
    [users, theme, onUserClick]
  );

  if (users.length === 0) {
    return (
      <div className={theme === "dark" ? styles.emptyDark : styles.emptyLight}>
        <h3 className={styles.emptyTitle}>Пользователи не найдены</h3>
        <p className={styles.emptyText}>Не удалось загрузить список пользователей. Попробуйте обновить страницу.</p>
      </div>
    );
  }

  const listClass = theme === "dark" ? styles.listDark : styles.listLight;
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Список пользователей</h2>
        <span className={styles.count}>
          Всего: <span className={styles.countNumber}>{users.length}</span>
        </span>
      </div>
      
      <ul className={listClass}>{renderedUsers}</ul>
    </div>
  );
});

export default UserList;