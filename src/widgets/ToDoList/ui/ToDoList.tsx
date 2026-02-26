import { memo } from "react";
import { TodoCard } from "@/entities";
import { ItemList } from "@/shared/ui/ItemList";
import { ITodoListProps } from "../lib";
import styles from "./ToDoList.module.css";

const ToDoList = memo(({ theme, todos, onToggle }: ITodoListProps) => {
  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="container">
      <div className={styles.stats}>
        <span className={styles.statsText}>
          Выполнено: <span className={styles.statsNumber}>{completedCount}</span> из {totalCount}
        </span>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
      
      <ItemList
        items={todos}
        theme={theme}
        emptyState={
          <div className={theme === "dark" ? styles.emptyDark : styles.emptyLight}>
            <div className={styles.emptyIcon}>✅</div>
            <h3 className={styles.emptyTitle}>Задачи отсутствуют</h3>
            <p className={styles.emptyText}>У этого пользователя пока нет задач в списке</p>
          </div>
        }
        renderItem={(todo) => (
          <TodoCard 
            {...todo} 
            theme={theme}
            onToggle={onToggle}
          />
        )}
      />
    </div>
  );
});

export default ToDoList;