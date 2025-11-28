'use client'

import useSWR from "swr";

export default function UserProfile({ id }) {
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data, error, isLoading, isValidating } = useSWR(
        id ? `https://jsonplaceholder.typicode.com/users/${id}` : null, 
        fetcher
    );

    if (error) return <div>Не удалось загрузить данные</div>;
    if (isLoading) return <div>Загрузка...</div>;

    return (
        <div className="user-profile">
            <h2>{data.name}</h2>
            <p>Email: {data.email}</p>
            <p>Телефон: {data.phone}</p>
            {isValidating && <div style={{color: 'blue'}}>Обновление данных...</div>}
        </div>
    );
}