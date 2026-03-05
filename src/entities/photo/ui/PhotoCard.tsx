import { FC } from "react";
import { IPhotoCardProps } from "../lib";
import styles from "./PhotoCard.module.css";

interface PhotoCardComponentProps extends IPhotoCardProps {
  theme?: "light" | "dark";
  onClick?: (photoId: number) => void;
  alt?: string;
}

const PhotoCard: FC<PhotoCardComponentProps> = ({
  albumId,
  id,
  title,
  thumbnailUrl,
  url,
  theme = "light",
  onClick,
  alt = title
}) => {
  const cardClass = `${styles.card} ${theme === "dark" ? styles["card--dark"] : ""}`;
  const handleClick = () => onClick?.(id);

  return (
    <div 
      className={cardClass} 
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Фотография: ${title}`}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      <div className={styles.imageWrapper}>
        <img 
          src={thumbnailUrl} 
          alt={alt} 
          className={styles.image}
          loading="lazy"
        />
      </div>
      
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.meta}>
          <span>ID: {id}</span>
          <span>Альбом: {albumId}</span>
        </div>
      </div>
      <div className={styles.hiddenUrl} data-full-url={url} aria-hidden="true" />
    </div>
  );
};

export default PhotoCard;