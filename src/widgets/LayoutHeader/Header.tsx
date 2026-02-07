import { FC, useState } from "react";
import { createPortal } from "react-dom";
import { Modal, Button } from "@/shared";
import { ThemeSwitcher } from "@/features";
import style from "./Header.module.css";

interface IHeaderProps {
  theme?: "light" | "dark";
}

const Header: FC<IHeaderProps> = ({ theme = "light" }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const headerClass = `${style.header} ${theme === "dark" ? style["header--dark"] : ""}`;

  return (
    <>
      <header className={headerClass}>
        <div className="container">
          <div className={style.wrapper}>
            <Button onClick={() => setIsModalOpen(true)}>
              Открыть модалку
            </Button>
            <ThemeSwitcher />
            <p className={style.headerTxt}>что то в header</p>
          </div>
        </div>
      </header>

    {typeof document !== "undefined" &&
      createPortal(
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          theme={theme}
        >
          <Modal.Header onClose={() => setIsModalOpen(false)} showCloseButton>
            Привет!
          </Modal.Header>
          
          <Modal.Content>
            <p>что то в модалке</p>
          </Modal.Content>
          
          <Modal.Footer>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Закрыть
            </Button>
          </Modal.Footer>
        </Modal>,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

export default Header;