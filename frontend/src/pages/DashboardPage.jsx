import React from 'react';
import PostCard from '../components/PostCard';

function DashboardPage({ posts, users, onPostClick }) { 
   const recentPosts = posts.slice(0, 6);
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Recent Posts</h1>
        <p>Discover the latest from our writing community</p>
      </div>
      <div className="posts-grid">
        {recentPosts.length > 0 ? (
          recentPosts.map(post => <PostCard key={post._id.$oid} post={post} users={users} onPostClick={onPostClick} />) // <-- Pass it down
        ) : (
          <p className="text-center">No posts yet. Be the first to write!</p>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;