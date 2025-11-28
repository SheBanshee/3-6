'use client'

import { useState } from 'react';
import useSWR from "swr";

export default function UserManagement() {
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const [selectedUserId, setSelectedUserId] = useState(null);

    const { data: users, error: usersError } = useSWR(
        "https://jsonplaceholder.typicode.com/users",
        fetcher
    );

    const { data: userDetails, error: detailsError } = useSWR(
        selectedUserId ? `https://jsonplaceholder.typicode.com/users/${selectedUserId}` : null,
        fetcher
    );

    if (usersError) return <div>Ошибка загрузки пользователей</div>;
    if (!users) return <div>Загрузка пользователей...</div>;

    return (
        <div className="user-management">
            <h2>Управление пользователями</h2>
            
            <select
                onChange={(e) => setSelectedUserId(e.target.value)}
                value={selectedUserId || ''}
            >
                <option value="">Выберите пользователя</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>

            {detailsError && <div>Ошибка загрузки деталей</div>}
            {userDetails && (
                <div className="user-details">
                    <h3>Детали пользователя</h3>
                    <p>Email: {userDetails.email}</p>
                    <p>Телефон: {userDetails.phone}</p>
                    <p>Город: {userDetails.address.city}</p>
                    <p>Компания: {userDetails.company.name}</p>
                </div>
            )}
        </div>
    );
}