import { memo, useMemo } from "react";
import { AlbumCard } from "@/entities";
import { IAlbumListProps } from "../lib";
import styles from "./AlbumList.module.css";

const AlbumList = memo(({ theme, albums, onAlbumClick }: IAlbumListProps) => {

  const renderedAlbums = useMemo(() => 
    albums.map(album => (
      <li key={album.id} className={styles.item}>
        <AlbumCard 
          {...album} 
          theme={theme}
          onClick={onAlbumClick}
        />
      </li>
    )), 
    [albums, theme, onAlbumClick]);

  if (albums.length === 0) {
    return (
      <div className={theme === "dark" ? styles.emptyDark : styles.emptyLight}>
        <p>Альбомы не найдены</p>
      </div>
    );
  }

  const listClass = theme === "dark" ? styles.listDark : styles.listLight;
  return <ul className={listClass}>{renderedAlbums}</ul>;
});

export default AlbumList;