'use client'

import useSWR from "swr";
import { useSWRConfig } from "swr";
import { useState } from "react";

export default function PostListWithMutations() {
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data, error, isLoading } = useSWR(
        "https://jsonplaceholder.typicode.com/posts",
        fetcher
    );
    const { mutate } = useSWRConfig();
    const [newPost, setNewPost] = useState({ title: "", body: "" });

    const handleDelete = async (postId) => {
        mutate("https://jsonplaceholder.typicode.com/posts", 
            (currentData) => currentData.filter(post => post.id !== postId),
            false
        );

        try {
            await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, { 
                method: 'DELETE' 
            });
            mutate("https://jsonplaceholder.typicode.com/posts");
        } catch (error) {
            mutate("https://jsonplaceholder.typicode.com/posts");
            alert('Не удалось удалить пост');
        }
    };

    const handleAddPost = async (e) => {
        e.preventDefault();
        const postToAdd = { 
            ...newPost, 
            id: Date.now(), 
            userId: 1 
        };

        mutate("https://jsonplaceholder.typicode.com/posts", 
            (currentData) => currentData ? [postToAdd, ...currentData] : [postToAdd],
            false
        );

        try {
            await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPost),
            });
            setNewPost({ title: "", body: "" });
            mutate("https://jsonplaceholder.typicode.com/posts");
        } catch (error) {
            mutate("https://jsonplaceholder.typicode.com/posts");
            alert('Не удалось добавить пост');
        }
    };

    if (error) return <div>Ошибка загрузки</div>;
    if (isLoading) return <div>Загрузка...</div>;

    return (
        <div className="post-list-mutations">
            <h2>Посты с мутациями</h2>
            
            <form onSubmit={handleAddPost} className="add-post-form">
                <input
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    placeholder="Заголовок"
                    required
                />
                <textarea
                    value={newPost.body}
                    onChange={(e) => setNewPost({...newPost, body: e.target.value})}
                    placeholder="Содержание"
                    required
                />
                <button type="submit">Добавить пост</button>
            </form>

            {data.slice(0, 5).map(post => (
                <div key={post.id} className="post-item">
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <button 
                        onClick={() => handleDelete(post.id)}
                        style={{backgroundColor: 'red', color: 'white'}}
                    >
                        Удалить
                    </button>
                </div>
            ))}
        </div>
    );
}