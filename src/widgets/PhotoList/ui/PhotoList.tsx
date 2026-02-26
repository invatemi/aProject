import { memo } from "react";
import { PhotoCard } from "@/entities";
import { ItemList } from "@/shared/ui/ItemList";
import { IPhotoListProps } from "../lib";
import styles from "./PhotoList.module.css";

const PhotoList = memo(({ theme, photos, onPhotoClick }: IPhotoListProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Фотографии альбома</h1>
      
      <ItemList
        items={photos}
        theme={theme}
        emptyMessage="Фотографии не найдены"
        emptySubtext="В этом альбоме пока нет изображений"
        renderItem={(photo) => (
          <PhotoCard 
            {...photo} 
            theme={theme}
            onClick={onPhotoClick}
            alt={`Фото: ${photo.title}`}
          />
        )}
      />
    </div>
  );
});

export default PhotoList;