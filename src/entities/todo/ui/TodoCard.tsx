import { FC } from "react";
import { ITodoCardProps } from "../lib";
import styles from "./TodoCard.module.css";

interface TodoCardComponentProps extends ITodoCardProps {
  theme?: "light" | "dark";
  onToggle?: (todoId: number) => void;
}

const TodoCard: FC<TodoCardComponentProps> = ({
  userId,
  id,
  title,
  completed,
  theme = "light",
  onToggle
}) => {
  const cardClass = `${styles.card} ${theme === "dark" ? styles["card--dark"] : ""} ${
    completed ? styles.completed : ""
  }`;
  
  const handleToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    onToggle?.(id);
  };

  return (
    <div className={cardClass}>
      <button
        type="button"
        className={`${styles.checkbox} ${completed ? styles.checked : ""}`}
        onClick={handleToggle}
        onKeyDown={(e) => e.key === "Enter" && handleToggle(e)}
        aria-label={`Отметить задачу "${title}" как ${completed ? "невыполненную" : "выполненную"}`}
        aria-checked={completed}
        role="checkbox"
        tabIndex={0}
      >
        {completed && <span className={styles.checkmark}>✓</span>}
      </button>
      
      <span className={styles.title}>{title}</span>
      
      <div className={styles.meta}>
        <span className={styles.metaItem}>ID:{id}</span>
        <span className={styles.metaItem}>Владелец:{userId}</span>
      </div>
    </div>
  );
};

export default TodoCard;