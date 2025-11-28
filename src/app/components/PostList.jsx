'use client'

import useSWR from "swr";
import { mutate } from "swr";

export default function PostList() {
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data, error, isLoading } = useSWR(
        "https://jsonplaceholder.typicode.com/posts",
        fetcher
    );

    const handleRefresh = () => {
        mutate("https://jsonplaceholder.typicode.com/posts");
    };

    if (error) return <div>Не удалось загрузить посты</div>;
    if (isLoading) return <div>Загрузка постов...</div>;

    return (
        <div className="post-list">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2>Список постов</h2>
                <button onClick={handleRefresh}>Обновить</button>
            </div>
            {data.slice(0, 5).map(post => (
                <div key={post.id} className="post-item">
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
}