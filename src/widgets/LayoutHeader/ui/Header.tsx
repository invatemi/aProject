import { FC, useState, useCallback } from "react";
import { Modal, Button } from "@/shared";
import { ThemeSwitcher } from "@/features";
import { IHeaderProps } from "../lib";
import style from "./Header.module.css";

const Header: FC<IHeaderProps> = ({ theme = "light" }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(() => setIsModalOpen(true), [setIsModalOpen]);
  const closeModal = useCallback(() => setIsModalOpen(false), [setIsModalOpen]);

  const headerClass = `${style.header} ${theme === "dark" ? style["header--dark"] : ""}`

  return (
    <>
      <header className={headerClass}>
        <div className="container">
          <div className={style.wrapper}>
            <p className={style.headerTxt}>Тут типо логотип Header</p>
            <div className={style.wrapperBlock}>
              <Button onClick={openModal}>Привет 404</Button>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </header>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          theme={theme}
        >
          <Modal.Header onClose={closeModal} showCloseButton>
            Привет привет !
          </Modal.Header>
          
          <Modal.Content>
            <p>Что-то в модалке</p>
          </Modal.Content>
          
          <Modal.Footer>
            <Button variant="primary" onClick={closeModal}>
              Закрыть
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Header;