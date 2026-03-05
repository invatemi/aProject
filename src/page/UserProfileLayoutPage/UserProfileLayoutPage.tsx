import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header, Footer, UserTabs } from "@/widgets";
import { useUserProfile } from "@/features";
import { MainLayout, useTheme, WithLoading, Button } from "@/shared";
import { selectIsAnyLoading } from "@/app/store/selectors";
import styles from "./UserProfileLayoutPage.module.css";

const UserProfileLayoutContent: FC = () => {
  
  const { theme } = useTheme();
  const { user, userId, isValidId, error, isLoading } = useUserProfile();
  const navigate = useNavigate();
  const layoutClass = theme === "dark" ? styles.mainDark : styles.mainLight;
  const errorClass = theme === "dark" ? styles.errorDark : styles.errorLight;
  const profileClass = theme === "dark" ? styles.profileDark : styles.profileLight;

  if (!isValidId) {
    return (
      <>
        <Header theme={theme} />
        <MainLayout className={layoutClass}>
          <div className="container">
            <div className={errorClass} role="alert">
              <span className={styles.errorIcon}>❌</span>
              <span>Некорректный идентификатор пользователя в URL</span>
            </div>
            <Button 
              variant="outline" 
              size="md"
              onClick={() => navigate("/users")}
              className={styles.backButton}
            >
            Вернуться к списку пользователей
            </Button>
          </div>
        </MainLayout>
        <Footer theme={theme} />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Header theme={theme} />
        <MainLayout className={layoutClass}>
          <div className="container">
            <div className={styles.skeleton}>
              <div className={styles.skeletonAvatar} />
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonTabs} />
            </div>
          </div>
        </MainLayout>
        <Footer theme={theme} />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header theme={theme} />
        <MainLayout className={layoutClass}>
          <div className="container">
            <div className={errorClass} role="alert">
              <span className={styles.errorIcon}>⚠️</span>
              <span>{error}</span>
            </div>
            <Button 
              variant="outline" 
              size="md"
              onClick={() => navigate("/users")}
              className={styles.backButton}
            >
            Вернуться к списку пользователей
            </Button>
          </div>
        </MainLayout>
        <Footer theme={theme} />
      </>
    );
  }

  return (
    <>
      <Header theme={theme} />
      <MainLayout className={layoutClass}>
        <div className="container">
          <div className={profileClass}>
            <div className={styles.profileHeader}>
              <Button 
                variant="ghost" 
                size="lg"
                onClick={() => navigate("/users")}
                aria-label="Назад к списку пользователей"
                className={styles.backButton}
              >
              ←
              </Button>
              <div className={styles.userInfo}>
                <div className={styles.avatar}>
                  <span className={styles.initials}>
                    {user?.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()}
                  </span>
                </div>
                <div>
                  <h1 className={styles.userName}>{user?.name}</h1>
                  <div className={styles.userMeta}>
                    <span>👤 ID: {user?.id}</span>
                    <span>✉️ {user?.email}</span>
                    <span>🌐 {user?.website}</span>
                  </div>
                </div>
              </div>
            </div>

            <UserTabs userId={userId} theme={theme} />

            <div className={styles.contentWrapper}>
              <Outlet />
            </div>
          </div>
        </div>
      </MainLayout>
      <Footer theme={theme} />
    </>
  );
};

const UserProfileLayoutPage = () => (
  <WithLoading loadingSelector={selectIsAnyLoading}>
    <UserProfileLayoutContent />
  </WithLoading>
);

export default UserProfileLayoutPage;