import { FC } from "react";
import { IFooterProps } from "../lib";
import style from "./Footer.module.css";

const Footer: FC<IFooterProps> = ({ theme = "light" }) => {
  const footerClass = `${style.footer} ${theme === "dark" ? style["footer--dark"] : ""}`;

  return (
    <footer className={footerClass}>
      <div className="container">
        <div className={style.wrapper}>
          <p className={style.footerTxt}>что то в footer</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;