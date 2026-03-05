import { FC } from "react";
import { Header, Footer, AlbumList } from "@/widgets";
import { MainLayout, useTheme, WithLoading } from "@/shared";
import { useAlbums, useAlbumNavigation } from "@/features";
import { selectIsAnyLoading } from "@/app/store/selectors";
import styles from "./AlbumPage.module.css";

const AlbumPageContent: FC = () => {
  
  const { theme } = useTheme();
  const { albums, error, isEmpty } = useAlbums();
  const { handleAlbumClick } = useAlbumNavigation();

  const layoutClass = theme === "dark" ? styles.mainDark : styles.mainLight;
  const errorClass = theme === "dark" ? styles.errorDark : styles.errorLight;
  const emptyClass = theme === "dark" ? styles.emptyDark : styles.emptyLight;

  return (
    <>
      <Header theme={theme} />
      <MainLayout className={layoutClass}>
        <div className="container">
          <div className={styles.headerSection}>
            <h1 className={styles.pageTitle}>Все альбомы</h1>
            <p className={styles.pageSubtitle}>
              Выберите альбом, чтобы посмотреть фотографии
            </p>
          </div>
          
          {error && (
            <div className={errorClass} role="alert">
              <span className={styles.errorIcon}>⚠️</span>
              <div>
                <strong>Ошибка загрузки:</strong> {error}
              </div>
            </div>
          )}
          
          {isEmpty && !error && (
            <div className={emptyClass}>
              <div className={styles.emptyIcon}>🖼️</div>
              <p className={styles.emptyText}>Альбомы не найдены</p>
              <p className={styles.emptyHint}>Попробуйте обновить страницу</p>
            </div>
          )}
          
          {!isEmpty && !error && (
            <AlbumList 
              theme={theme} 
              albums={albums} 
              onAlbumClick={handleAlbumClick}
            />
          )}
        </div>
      </MainLayout>
      <Footer theme={theme} />
    </>
  );
};

const AlbumPage = () => (
  <WithLoading loadingSelector={selectIsAnyLoading}>
    <AlbumPageContent />
  </WithLoading>
);

export default AlbumPage;