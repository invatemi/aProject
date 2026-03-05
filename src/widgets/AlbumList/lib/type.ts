export interface IAlbumCardProps {
  userId: number;
  id: number;
  title: string;
}

export interface IAlbumListProps {
  theme: 'light' | 'dark';
  albums: IAlbumCardProps[];
  onAlbumClick?: (albumId: number) => void;
}