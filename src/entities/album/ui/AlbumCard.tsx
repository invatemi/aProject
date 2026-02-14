import { FC } from "react";
import { IAlbumCardProps } from "../lib";
import styles from "./AlbumCard.module.css";

interface AlbumCardComponentProps extends IAlbumCardProps {
  theme?: "light" | "dark";
  onClick?: (albumId: number) => void;
}

const AlbumCard: FC<AlbumCardComponentProps> = ({
  userId,
  id,
  title,
  theme = "light",
  onClick
}) => {
  const cardClass = `${styles.card} ${theme === "dark" ? styles["card--dark"] : ""}`;
  const handleClick = () => onClick?.(id);

  return (
    <div 
      className={cardClass}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Альбом: ${title}`}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      <div className={styles.icon}>🖼️</div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.meta}>
        <span className={styles.metaItem}>🆔 ID: {id}</span>
        <span className={styles.metaItem}>👤 Владелец: {userId}</span>
      </div>
    </div>
  );
};

export default AlbumCard;