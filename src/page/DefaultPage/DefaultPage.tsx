import { FC } from "react";
import { PostLengthFilter } from "@/features";
import { PostList, Header, Footer } from "@/widgets";
import { MainLayout, useTheme, WithLoading } from "@/shared";
import { selectIsAnyLoading } from "@/app/store/selectors";
import { useDefaultPageLogic } from "@/features/default-page";
import style from "./DefaultPage.module.css";

const DefaultPageContent: FC = () => {
  const { theme } = useTheme();
  const {
    posts,
    postsError,
    sortedPosts,
    selectedPostId,
    handlePostClick,
    handleSort,
    sortOrder,
    commentsByPostId
  } = useDefaultPageLogic();

  const layoutClass = theme === "dark" ? style.mainDark : style.mainLight;
  const errorClass = theme === "dark" ? style.errorDark : style.errorLight;

  return (
    <>
      <Header theme={theme} />
      <MainLayout className={layoutClass}>
        <div className="container">
          <PostLengthFilter currentOrder={sortOrder} onSort={handleSort} />
          
          {postsError && (
            <div className={errorClass}>
              <span>Ошибка загрузки: {postsError}</span>
            </div>
          )}
          
          {posts.length > 0 && (
            <PostList 
              theme={theme} 
              posts={sortedPosts} 
              onPostClick={handlePostClick}
              selectedPostId={selectedPostId ?? undefined}
              commentsByPostId={commentsByPostId as any}
            />
          )}
        </div>
      </MainLayout>
      <Footer theme={theme} />
    </>
  );
};

const DefaultPage = () => (
  <WithLoading loadingSelector={selectIsAnyLoading}>
    <DefaultPageContent />
  </WithLoading>
);

export default DefaultPage;