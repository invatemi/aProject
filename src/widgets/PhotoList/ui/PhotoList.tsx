import { memo, useMemo } from "react";
import { PhotoCard } from "@/entities";
import { IPhotoListProps } from "../lib";
import styles from "./PhotoList.module.css";

const PhotoList = memo(({ theme, photos, onPhotoClick }: IPhotoListProps) => {

  const renderedPhotos = useMemo(() => 
    photos.map(photo => (
      <li key={photo.id} className={styles.item}>
        <PhotoCard 
          {...photo} 
          theme={theme}
          onClick={onPhotoClick}
          alt={`Фото: ${photo.title}`}
        />
      </li>
    )), 
    [photos, theme, onPhotoClick]);

  if (photos.length === 0) {
    return (
      <div className={theme === "dark" ? styles.emptyDark : styles.emptyLight}>
        <p className={styles.emptyText}>Фотографии не найдены</p>
        <p className={styles.emptySubtext}>В этом альбоме пока нет изображений</p>
      </div>
    );
  }

  const listClass = theme === "dark" ? styles.listDark : styles.listLight;
  return <ul className={listClass}>{renderedPhotos}</ul>;
});

export default PhotoList;