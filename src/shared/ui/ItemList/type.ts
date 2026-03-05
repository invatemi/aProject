import { CSSProperties, ReactNode } from 'react';

export interface ItemListProps<T extends { id: number | string }> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor?: (item: T) => number | string;
  theme?: 'light' | 'dark';
  className?: string;
  itemClassName?: string;
  listStyle?: CSSProperties;
  itemStyle?: CSSProperties;
  emptyState?: ReactNode;
  emptyMessage?: string;
  emptySubtext?: string;
  onItemClick?: (item: T) => void;
  header?: ReactNode;
  footer?: ReactNode;
  ariaLabel?: string;
}