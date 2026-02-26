import { FC } from "react";
import { PostLengthFilter, usePostNavigation, useSortPost } from "@/features";
import { PostList, Header, Footer } from "@/widgets";
import { MainLayout, useTheme, WithLoading } from "@/shared";
import { selectIsAnyLoading } from "@/app/store/selectors";
import style from "./PostPage.module.css";

const PostPageContent: FC = () => {

  const { theme } = useTheme();
  const {
    posts,
    postsError,
    sortedPosts,
    handleSort,
    sortOrder,
  } = useSortPost();
  
  const { handlePostClick } = usePostNavigation();

  const layoutClass = theme === "dark" ? style.mainDark : style.mainLight;
  const errorClass = theme === "dark" ? style.errorDark : style.errorLight;

  return (
    <>
      <Header theme={theme} />
      <MainLayout className={layoutClass}>
        <div className="container">
          <div className={style.headerSection}>
            <h1 className={style.pageTitle}>Список постов</h1>
            <PostLengthFilter currentOrder={sortOrder} onSort={handleSort} />
          </div>
          
          {postsError && (
            <div className={errorClass} role="alert">
              <span>Ошибка загрузки: {postsError}</span>
            </div>
          )}
          
          {posts.length > 0 && (
            <PostList 
              theme={theme} 
              posts={sortedPosts} 
              onPostClick={handlePostClick}
            />
          )}
          
          {posts.length === 0 && !postsError && (
            <div className={theme === "dark" ? style.emptyDark : style.emptyLight}>
              <p>Посты не найдены</p>
            </div>
          )}
        </div>
      </MainLayout>
      <Footer theme={theme} />
    </>
  );
};

const PostPage = () => (
  <WithLoading loadingSelector={selectIsAnyLoading}>
    <PostPageContent />
  </WithLoading>
);

export default PostPage;