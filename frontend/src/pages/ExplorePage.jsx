import React from 'react';
import PostCard from '../components/PostCard';

function ExplorePage({ posts, users }) {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Explore</h1>
        <p className="page-subtitle">Discover amazing content from our community</p>
      </div>
      <div className="posts-grid">
        {posts && posts.length > 0 ? (
          posts.map(post => <PostCard key={post._id.$oid} post={post} users={users} />)
        ) : (
          <p className="text-center">No posts to explore yet.</p>
        )}
      </div>
    </div>
  );
}

export default ExplorePage;
