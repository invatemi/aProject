import { memo, useMemo } from "react";
import { TodoCard } from "@/entities";
import { ITodoListProps } from "../lib";
import styles from "./ToDoList.module.css";

const ToDoList = memo(({ theme, todos, onToggle }: ITodoListProps) => {

  const renderedTodos = useMemo(() => 
    todos.map(todo => (
      <li key={todo.id} className={styles.item}>
        <TodoCard 
          {...todo} 
          theme={theme}
          onToggle={onToggle}
        />
      </li>
    )), 
    [todos, theme, onToggle]
  );

  if (todos.length === 0) {
    return (
      <div className={theme === "dark" ? styles.emptyDark : styles.emptyLight}>
        <div className={styles.emptyIcon}>✅</div>
        <h3 className={styles.emptyTitle}>Задачи отсутствуют</h3>
        <p className={styles.emptyText}>У этого пользователя пока нет задач в списке</p>
      </div>
    );
  }

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;
  const listClass = theme === "dark" ? styles.listDark : styles.listLight;
  
  return (
    <div className="container">
      <div className={styles.stats}>
        <span className={styles.statsText}>
          Выполнено: <span className={styles.statsNumber}>{completedCount}</span> из {totalCount}
        </span>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>
      
      <ul className={listClass}>{renderedTodos}</ul>
    </div>
  );
});

export default ToDoList;