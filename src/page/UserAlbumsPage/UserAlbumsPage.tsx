import { FC } from "react";
import { AlbumList } from "@/widgets";
import { useTheme } from "@/shared";
import { useAlbumNavigation, useUserAlbums } from "@/features";
import styles from "./UserAlbumsPage.module.css";

const UserAlbumsPage: FC = () => {
  
  const { theme } = useTheme();
  const { albums, error, isEmpty } = useUserAlbums();
  const { handleAlbumClick } = useAlbumNavigation();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>🖼️ Альбомы пользователя</h2>
        <span className={styles.count}>
          Всего: <span className={styles.countNumber}>{albums.length}</span>
        </span>
      </div>

      {error && (
        <div 
          className={`${styles.error} ${theme === "dark" ? styles.errorDark : styles.errorLight}`} 
          role="alert"
        >
          <span className={styles.errorIcon}>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {isEmpty && !error && (
        <div className={theme === "dark" ? styles.emptyDark : styles.emptyLight}>
          <div className={styles.emptyIcon}>📭</div>
          <p>У пользователя пока нет альбомов</p>
          <p className={styles.emptySubtext}>Альбомы появятся после их создания</p>
        </div>
      )}

      {albums.length > 0 && (
        <AlbumList 
          theme={theme} 
          albums={albums} 
          onAlbumClick={handleAlbumClick}
        />
      )}
    </div>
  );
};

export default UserAlbumsPage;