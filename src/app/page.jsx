import UserProfile from './components/UserProfile';
import PostList from './components/PostList';
import PostListWithMutations from './components/PostListWithMutations';
import InfinitePosts from './components/InfinitePosts';
import UserManagement from './components/UserManagement';

export default function HomePage() {
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>SWR Демонстрация</h1>
            
            <section style={{marginBottom: '40px'}}>
                <h2>Лекция 1: Профиль пользователя</h2>
                <UserProfile id="1" />
            </section>

            <section style={{marginBottom: '40px'}}>
                <h2>Лекция 1: Список постов</h2>
                <PostList />
            </section>

            <section style={{marginBottom: '40px'}}>
                <h2>Лекция 2: Мутации</h2>
                <PostListWithMutations />
            </section>

            <section style={{marginBottom: '40px'}}>
                <h2>Лекция 2: Бесконечная лента</h2>
                <InfinitePosts />
            </section>

            <section style={{marginBottom: '40px'}}>
                <h2>Лекция 3: Зависимые запросы</h2>
                <UserManagement />
            </section>
        </div>
    );
}