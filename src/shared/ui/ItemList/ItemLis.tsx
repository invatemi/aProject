import { memo, useMemo } from 'react';
import { ItemListProps } from './type';
import styles from './ItemLis.module.css';

const ItemList = <T extends { id: number | string }>({
  items,
  renderItem,
  keyExtractor = (item) => item.id,
  theme = 'light',
  className = '',
  itemClassName = '',
  listStyle,
  itemStyle,
  emptyState,
  emptyMessage = 'Элементы не найдены',
  emptySubtext,
  onItemClick,
  header,
  footer,
  ariaLabel,
}: ItemListProps<T>) => {
  
  const renderedItems = useMemo(() => 
    items.map((item, index) => {
      const key = keyExtractor(item);
      const content = renderItem(item, index);
      const handleClick = onItemClick ? () => onItemClick(item) : undefined;

      return (
        <li 
          key={key} 
          className={`${styles.item} ${itemClassName}`}
          style={itemStyle}
          onClick={handleClick}
          role={onItemClick ? 'button' : undefined}
          tabIndex={onItemClick ? 0 : undefined}
          onKeyDown={onItemClick ? (e) => e.key === 'Enter' && handleClick?.() : undefined}
        >
          {content}
        </li>
      );
    }), 
    [items, renderItem, keyExtractor, itemClassName, itemStyle, onItemClick]);

  const isEmpty = items.length === 0;
  if (isEmpty) {
    if (emptyState) return <>{emptyState}</>;
    
    return (
      <div className={theme === 'dark' ? styles.emptyDark : styles.emptyLight}>
        <p className={styles.emptyText}>{emptyMessage}</p>
        {emptySubtext && <p className={styles.emptySubtext}>{emptySubtext}</p>}
      </div>
    );
  }

  const listClass = `${styles.list} ${theme === 'dark' ? styles.listDark : styles.listLight} ${className}`.trim();

  return (
    <>
      {header}
      <ul className={listClass} style={listStyle} aria-label={ariaLabel}>
        {renderedItems}
      </ul>
      {footer}
    </>
  );
};

export default memo(ItemList) as <T extends { id: number | string }>(
  props: ItemListProps<T>
) => ReturnType<typeof ItemList>;