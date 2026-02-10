import { FC } from "react";
import { useNavigate } from 'react-router-dom';
import { useTheme, Button } from "@/shared";
import style from "./ErrorPage.module.css";

const ErrorPage: FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const containerClass = theme === 'dark' 
    ? `${style.container} ${style.dark}`
    : style.container;

  return (
    <div className={containerClass}>
      <div className={style.content}>
        <div className={style.code}>404</div>
        <h1 className={style.title}>Страница не найдена</h1>
        <p className={style.subtitle}>
          Запрашиваемая страница отсутствует или была удалена
        </p>
        <Button 
          variant="primary" 
          size="md" 
          fullWidth
          onClick={() => navigate('/')}
        >
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;