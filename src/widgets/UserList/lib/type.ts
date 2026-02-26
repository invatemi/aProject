export interface IUserCardProps {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface IUserListProps {
  theme: 'light' | 'dark';
  users: IUserCardProps[];
  onUserClick?: (userId: number) => void;
}