export interface IPhotoCardProps {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface IPhotoListProps {
  theme: 'light' | 'dark';
  photos: IPhotoCardProps[];
  onPhotoClick?: (photoId: number) => void;
}