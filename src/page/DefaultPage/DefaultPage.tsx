import { FC } from "react";
import { Header, Footer } from "@/widgets";
import { MainLayout } from "@/shared";
import { PostList } from "@/widgets";
import { useTheme } from "@/shared";
import style from "./DefaultPage.module.css";

const DefaultPage: FC = () => {
  const { theme } = useTheme();

  const layoutClass = theme === "dark" 
    ? style.mainDark 
    : style.mainLight;

  const posts = [
    { userId: 'tomi', id: 1, title: 'Привет мир', body: 'Привет мир Привет мир' },
    { userId: 'toti', id: 2, title: 'Привет мир', body: 'Привет мир Привет мир' },
    { userId: 'tito', id: 3, title: 'Привет мир', body: 'Привет мир Привет мир' },
  ];

  return (
    <>
      <Header theme={theme} />
      <MainLayout className={layoutClass}>
        <div className="container">
          <PostList theme={theme} posts={posts} />
        </div>
      </MainLayout>
      <Footer theme={theme} />
    </>
  );
};

export default DefaultPage;