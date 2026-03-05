import { FC } from "react";
import { Header, Footer, CommentList } from "@/widgets";
import { MainLayout, useTheme, WithLoading } from "@/shared";
import { usePostDetail } from "@/features";
import { selectIsAnyLoading } from "@/app/store/selectors";
import styles from "./PostDetailPage.module.css";

const PostDetailPageContent: FC = () => {
  
  const { theme } = useTheme();
  const {
    post,
    postError,
    comments,
    commentsError,
    postId,
    isValidId,
    isEmpty
  } = usePostDetail();

  const layoutClass = theme === "dark" ? styles.mainDark : styles.mainLight;
  const errorClass = theme === "dark" ? styles.errorDark : styles.errorLight;
  const sectionClass = theme === "dark" ? styles.sectionDark : styles.sectionLight;

  if (!isValidId) {
    return (
      <>
        <Header theme={theme} />
        <MainLayout className={layoutClass}>
          <div className="container">
            <div className={errorClass} role="alert">
              <span>Некорректный идентификатор поста. Проверьте URL.</span>
            </div>
          </div>
        </MainLayout>
        <Footer theme={theme} />
      </>
    );
  }

  return (
    <>
      <Header theme={theme} />
      <MainLayout className={layoutClass}>
        <div className="container">
          <h1 className={styles.pageTitle}>
            {post 
              ? `${post.title}` 
              : (isEmpty ? `Пост #${postId} не найден` : `Загрузка поста #${postId}...`)}
          </h1>

          {postError && (
            <div className={errorClass} role="alert">
              <span>Ошибка загрузки поста: {postError}</span>
            </div>
          )}

          {isEmpty && !postError && (
            <div className={sectionClass}>
              <div className={styles.emptyState}>
                <p>Пост с идентификатором <strong>#{postId}</strong> не существует в системе</p>
                <a href="/posts" className={styles.backLink}>← Вернуться к списку постов</a>
              </div>
            </div>
          )}

          {post && (
            <article className={`${styles.postDetail} ${sectionClass}`}>
              <div className={styles.postMeta}>
                <span className={styles.metaItem}>ID поста: {post.id}</span>
                <span className={styles.metaItem}>Автор: Пользователь #{post.userId}</span>
              </div>
              
              <div className={styles.postContent}>
                <p>{post.body}</p>
              </div>
            </article>
          )}

          <section className={`${styles.commentsSection} ${sectionClass}`}>
            <h2 className={styles.commentsTitle}>Комментарии ({comments.length})</h2>
            
            {commentsError && (
              <div className={errorClass} role="alert">
                <span>Ошибка загрузки комментариев: {commentsError}</span>
              </div>
            )}
            
            <CommentList 
              theme={theme} 
              comments={comments} 
            />
          </section>
        </div>
      </MainLayout>
      <Footer theme={theme} />
    </>
  );
};

const PostDetailPage = () => (
  <WithLoading loadingSelector={selectIsAnyLoading}>
    <PostDetailPageContent />
  </WithLoading>
);

export default PostDetailPage;