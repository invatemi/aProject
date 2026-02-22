import { FC } from "react";
import { Header, Footer, UserList } from "@/widgets";
import { MainLayout, useTheme, WithLoading } from "@/shared";
import { useUsers, useUserNavigation } from "@/features";
import { selectIsAnyLoading } from "@/app/store/selectors";
import styles from "./UsersPage.module.css";

const UsersPageContent: FC = () => {
  
  const { theme } = useTheme();
  const { users, error, isEmpty } = useUsers();
  const { handleUserClick } = useUserNavigation();

  const layoutClass = theme === "dark" ? styles.mainDark : styles.mainLight;
  const errorClass = theme === "dark" ? styles.errorDark : styles.errorLight;

  return (
    <>
      <Header theme={theme} />
      <MainLayout className={layoutClass}>
        <div className="container">
          <h1 className={styles.pageTitle}>Список пользователей</h1>

          {error && (
            <div className={errorClass} role="alert">
              <span>Ошибка загрузки списка пользователей: {error}</span>
            </div>
          )}

          {isEmpty && !error && (
            <div className={theme === "dark" ? styles.emptyDark : styles.emptyLight}>
              <p>Пользователи не найдены</p>
              <p className={styles.emptySubtext}>Сервер вернул пустой список</p>
            </div>
          )}

          {users.length > 0 && (
            <UserList
              theme={theme}
              users={users}
              onUserClick={handleUserClick}
            />
          )}
        </div>
      </MainLayout>
      <Footer theme={theme} />
    </>
  );
};

const UsersPage = () => (
  <WithLoading loadingSelector={selectIsAnyLoading}>
    <UsersPageContent />
  </WithLoading>
);

export default UsersPage;