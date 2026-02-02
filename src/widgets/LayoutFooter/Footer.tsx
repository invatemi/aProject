import { FC } from "react";
import style from "./Footer.module.css"

const Footer : FC = () => {
    return (
        <footer className={style.footer}>
            <div className="container">
                <div className={style.wrapper}>
                    <p className={style.footerTxt}>что то в footer</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer