import { FC } from "react";
import { ToDoList } from "@/widgets";
import { useUserTodos, useTodoActions } from "@/features";
import { MainLayout, useTheme, WithLoading } from "@/shared";
import { selectIsAnyLoading } from "@/app/store/selectors";
import styles from "./UserTodosPage.module.css";

const UserTodosPageContent: FC = () => {
  
  const { theme } = useTheme();
  const { todos, userId, isValidId, error, isEmpty } = useUserTodos();
  const { toggleTodo } = useTodoActions();

  const layoutClass = theme === "dark" ? styles.mainDark : styles.mainLight;
  const errorClass = theme === "dark" ? styles.errorDark : styles.errorLight;

  if (!isValidId) {
    return (
      <>
        <MainLayout className={layoutClass}>
          <div className="container">
            <div className={errorClass} role="alert">
              <span className={styles.errorIcon}>❌</span>
              <span>Некорректный идентификатор пользователя</span>
            </div>
          </div>
        </MainLayout>
      </>
    );
  }

  return (
    <>
      <MainLayout className={layoutClass}>
        <div className="container">
          <div className={styles.headerSection}>
            <h1 className={styles.pageTitle}>
              ✅ Задачи пользователя #{userId}
            </h1>
            <span className={styles.subtitle}>
              Всего задач: {todos.length}
            </span>
          </div>

          {error && (
            <div className={errorClass} role="alert">
              <span className={styles.errorIcon}>⚠️</span>
              <span>Ошибка загрузки задач: {error}</span>
            </div>
          )}

          {isEmpty && !error && (
            <div className={theme === "dark" ? styles.emptyDark : styles.emptyLight}>
              <div className={styles.emptyIcon}>📭</div>
              <p>У пользователя пока нет задач</p>
              <p className={styles.emptySubtext}>Задачи появятся после их создания</p>
            </div>
          )}

          {todos.length > 0 && (
            <ToDoList
              theme={theme}
              todos={todos}
              onToggle={toggleTodo}
            />
          )}
        </div>
      </MainLayout>
    </>
  );
};

const UserTodosPage = () => (
  <WithLoading loadingSelector={selectIsAnyLoading}>
    <UserTodosPageContent />
  </WithLoading>
);

export default UserTodosPage;