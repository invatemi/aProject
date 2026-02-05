import { FC, ReactNode } from "react";

interface MainLayoutProps {
    children: ReactNode;
    className?: string;
}

const MainLayout: FC<MainLayoutProps> = ({ children, className }) => {
    return <main className={className}>{children}</main>;
};

export default MainLayout;