import { FC, useState } from "react";
import { createPortal } from "react-dom";
import { Modal, Button } from "@/shared";
import { ThemeSwitcher } from "@/features";
import style from "./Header.module.css";

const Header: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className={style.header}>
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
            title="Привет!"
            showCloseButton={true}
          >
            <p>что то в модалке</p>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Закрыть
            </Button>
          </Modal>,
          document.getElementById("modal-root")!
        )}
    </>
  );
};

export default Header;