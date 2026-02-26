import { FC } from "react";
import { PostList } from "@/widgets";
import { useTheme } from "@/shared";
import { useUserPosts, usePostNavigation } from "@/features";
import styles from "./UserPostsPage.module.css";

const UserPostsPage: FC = () => {
  
  const { theme } = useTheme();
  const { posts, error, isEmpty } = useUserPosts();
  const { handlePostClick } = usePostNavigation();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Посты пользователя</h2>
        <span className={styles.count}>
          Всего: <span className={styles.countNumber}>{posts.length}</span>
        </span>
      </div>

      {error && (
        <div 
          className={`${styles.error} ${theme === "dark" ? styles.errorDark : styles.errorLight}`} 
          role="alert"
        >
          <span className={styles.errorIcon}>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {isEmpty && !error && (
        <div className={theme === "dark" ? styles.emptyDark : styles.emptyLight}>
          <div className={styles.emptyIcon}>📭</div>
          <p>У пользователя пока нет постов</p>
          <p className={styles.emptySubtext}>Посты появятся после их создания</p>
        </div>
      )}

      {posts.length > 0 && (
        <PostList 
          theme={theme} 
          posts={posts} 
          onPostClick={handlePostClick}
        />
      )}
    </div>
  );
};

export default UserPostsPage;