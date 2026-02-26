import { memo } from "react";
import { UserCard } from "@/entities";
import { ItemList } from "@/shared/ui/ItemList";
import { IUserListProps } from "../lib";
import styles from "./UserList.module.css";

const UserList = memo(({ theme, users, onUserClick }: IUserListProps) => {
  return (
    <div className={styles.container}>
      <ItemList
        items={users}
        theme={theme}
        header={
          <div className={styles.header}>
            <h2 className={styles.title}>Список пользователей</h2>
            <span className={styles.count}>
              Всего: <span className={styles.countNumber}>{users.length}</span>
            </span>
          </div>
        }
        emptyState={
          <div className={theme === "dark" ? styles.emptyDark : styles.emptyLight}>
            <h3 className={styles.emptyTitle}>Пользователи не найдены</h3>
            <p className={styles.emptyText}>Не удалось загрузить список пользователей. Попробуйте обновить страницу.</p>
          </div>
        }
        renderItem={(user) => (
          <UserCard 
            {...user} 
            theme={theme}
            onClick={onUserClick}
          />
        )}
      />
    </div>
  );
});

export default UserList;