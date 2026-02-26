import { FC } from "react";
import { Header, Footer, PhotoList } from "@/widgets";
import { MainLayout, useTheme, WithLoading } from "@/shared";
import { useAlbumPhotos } from "@/features";
import { selectIsAnyLoading } from "@/app/store/selectors";
import styles from "./AlbumPhotosPage.module.css";

const AlbumPhotosPageContent: FC = () => {
  
  const { theme } = useTheme();
  const { photos, error, albumId, isEmpty } = useAlbumPhotos();

  const layoutClass = theme === "dark" ? styles.mainDark : styles.mainLight;
  const errorClass = theme === "dark" ? styles.errorDark : styles.errorLight;
  const emptyClass = theme === "dark" ? styles.emptyDark : styles.emptyLight;

  return (
    <>
      <Header theme={theme} />
      <MainLayout className={layoutClass}>
        <div className="container">
          <h1 className={styles.pageTitle}>
            {albumId 
              ? `Фотографии альбома #${albumId}` 
              : "Неверный идентификатор альбома"}
          </h1>
          
          {error && (
            <div className={errorClass} role="alert">
              <span className={styles.errorIcon}>⚠️</span>
              <span>Ошибка загрузки фотографий: {error}</span>
            </div>
          )}
          
          {isEmpty && !error && (
            <div className={emptyClass}>
              <div className={styles.emptyIcon}>🖼️</div>
              <p>В этом альбоме пока нет фотографий</p>
            </div>
          )}
          
          {photos.length > 0 && (
            <PhotoList 
              theme={theme} 
              photos={photos} 
            />
          )}
        </div>
      </MainLayout>
      <Footer theme={theme} />
    </>
  );
};

const AlbumPhotosPage = () => (
  <WithLoading loadingSelector={selectIsAnyLoading}>
    <AlbumPhotosPageContent />
  </WithLoading>
);

export default AlbumPhotosPage;