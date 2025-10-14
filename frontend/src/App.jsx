import React, { useState, useEffect } from 'react';
import './style.css';
import api from './api';
import Navbar from './components/Navbar';
import PostModal from './components/PostModal';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import WritePage from './pages/WritePage';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [route, setRoute] = useState('auth');
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (currentUser) {
      refreshData();
    }
  }, [currentUser]);

  const refreshData = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const [postsData, usersData] = await Promise.all([
        api.get('/api/posts'),
        api.get('/api/users')
      ]);
      setPosts(postsData);
      setUsers(usersData);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
    setLoading(false);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setRoute('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setRoute('auth');
  };

  const openPostModal = (post) => {
    setSelectedPost(post);
  };

  const closePostModal = () => {
    setSelectedPost(null);
  };

  const renderPage = () => {
    if (!currentUser) {
      return <AuthPage onLogin={handleLogin} />;
    }
    if (loading) {
      return <div className="page-container text-center"><h2>Loading...</h2></div>;
    }

    switch (route) {
      case 'dashboard':
        return <DashboardPage posts={posts} users={users} onPostClick={openPostModal} />;
      case 'write':
        return <WritePage currentUser={currentUser} onPostCreated={() => { setRoute('dashboard'); refreshData(); }} />;
      case 'explore':
        return <ExplorePage posts={posts} users={users} onPostClick={openPostModal} />;
      case 'profile':
        return <ProfilePage currentUser={currentUser} posts={posts} users={users} onPostClick={openPostModal} />;
      default:
        return <DashboardPage posts={posts} users={users} onPostClick={openPostModal} />;
    }
  };

  return (
    <div>
      {currentUser && <Navbar onLogout={handleLogout} setRoute={setRoute} />}
      <main className="main-container">
        {renderPage()}
      </main>
      {selectedPost && <PostModal post={selectedPost} users={users} onClose={closePostModal} />}
    </div>
  );
}

export default App;