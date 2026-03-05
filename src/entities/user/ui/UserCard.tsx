import { FC } from "react";
import { IUserCardProps } from "../lib";
import styles from "./UserCard.module.css";

interface UserCardComponentProps extends IUserCardProps {
  theme?: "light" | "dark";
  onClick?: (userId: number) => void;
}

const UserCard: FC<UserCardComponentProps> = ({
  id,
  name,
  username,
  email,
  theme = "light",
  onClick
}) => {
  const cardClass = `${styles.card} ${theme === "dark" ? styles["card--dark"] : ""}`;

  const handleClick = () => onClick?.(id);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div 
      className={cardClass}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Перейти в профиль пользователя ${name}`}
    >
      <div className={styles.avatar}>
        <span className={styles.initials}>
          {name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()}
        </span>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.username}>@{username}</div>
        <div className={styles.contact}>
          <span className={styles.contactIcon}>✉️</span>
          <span className={styles.email}>{email}</span>
        </div>
      </div>
      
      <div className={styles.footer}>
        <span className={styles.badge}>ID: {id}</span>
        <span className={styles.badge}>Пользователь</span>
      </div>
    </div>
  );
};

export default UserCard;