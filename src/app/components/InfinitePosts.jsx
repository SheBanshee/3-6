'use client'

import useSWRInfinite from 'swr/infinite';

export default function InfinitePosts() {
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    
    const getKey = (pageIndex, previousPageData) => {
        if (previousPageData && !previousPageData.length) return null;
        return `https://jsonplaceholder.typicode.com/posts?_page=${pageIndex + 1}&_limit=5`;
    };

    const { data, error, size, setSize, isValidating } = useSWRInfinite(
        getKey,
        fetcher,
        { revalidateFirstPage: false }
    );

    const posts = data ? data.flat() : [];
    const isLoadingInitial = !data && !error;
    const isLoadingMore = 
        size > 0 && data && typeof data[size - 1] === 'undefined';
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 5);

    if (error) return <div>Ошибка загрузки</div>;
    if (isLoadingInitial) return <div>Загрузка...</div>;

    return (
        <div className="infinite-posts">
            <h2>Бесконечная лента постов</h2>
            
            {posts.map(post => (
                <div key={post.id} className="post-item">
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
            
            <div style={{textAlign: 'center', margin: '20px 0'}}>
                {!isReachingEnd ? (
                    <button
                        onClick={() => setSize(size + 1)}
                        disabled={isLoadingMore}
                    >
                        {isLoadingMore ? 'Загрузка...' : 'Загрузить еще'}
                    </button>
                ) : (
                    <p>Все посты загружены</p>
                )}
            </div>
        </div>
    );
}