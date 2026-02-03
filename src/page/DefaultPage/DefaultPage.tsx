import { FC } from "react";
import { Header, Footer } from "@/widgets";
import { MainLayout } from "@/shared";
import {PostList} from "@/widgets"

const DefaultPage : FC = () => {
    // пока что мок данные
    // userId: string;
    // id: number;
    // title: string;
    // body: string;

    const post = [
        {
            userId: 'tomi',
            id: 1,
            title: 'Привет мир',
            body: ' Привет мир Привет мир',
        },
        {
            userId: 'toti',
            id: 2,
            title: 'Привет мир',
            body: ' Привет мир Привет мир',
        },
        {
            userId: 'tito',
            id: 3,
            title: 'Привет мир',
            body: ' Привет мир Привет мир',
        },
    ]

    return (
        <>
        <Header/>
        <MainLayout>
            <div className="container">
                <PostList posts={post}/>
            </div>
        </MainLayout>
        <Footer/>
        </>
    )
}

export default DefaultPage