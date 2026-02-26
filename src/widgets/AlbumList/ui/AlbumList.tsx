import { memo } from "react";
import { AlbumCard } from "@/entities";
import { ItemList } from "@/shared/ui/ItemList";
import { IAlbumListProps } from "../lib";

const AlbumList = memo(({ theme, albums, onAlbumClick }: IAlbumListProps) => {
  return (
    <ItemList
      items={albums}
      theme={theme}
      emptyMessage="Альбомы не найдены"
      renderItem={(album) => (
        <AlbumCard 
          {...album} 
          theme={theme}
          onClick={onAlbumClick}
        />
      )}
    />
  );
});

export default AlbumList;