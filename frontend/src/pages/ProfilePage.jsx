import React from 'react';
import PostCard from '../components/PostCard';

function ProfilePage({ currentUser, posts, users }) {
  const userPosts = posts.filter(post => post.authorId === currentUser._id);

  return (
    <div className="page-container">
      <div className="profile-header">
        <div className="profile__avatar">{currentUser.name.charAt(0).toUpperCase()}</div>
        <h1 className="profile__name">{currentUser.name}</h1>
        <p className="profile__username">@{currentUser.username}</p>
        <p className="profile__bio">{currentUser.bio}</p>
        <div className="profile__stats">
          <div className="profile__stat">
            <span className="profile__stat-number">{userPosts.length}</span>
            <span className="profile__stat-label">Posts</span>
          </div>
          <div className="profile__stat">
            <span className="profile__stat-number">{currentUser.followers || 0}</span>
            <span className="profile__stat-label">Followers</span>
          </div>
          <div className="profile__stat">
            <span className="profile__stat-number">{currentUser.following || 0}</span>
            <span className="profile__stat-label">Following</span>
          </div>
        </div>
      </div>

      <h3 className="page-header" style={{textAlign: 'left', marginTop: '2rem'}}>Your Posts</h3>
      <div className="posts-grid">
        {userPosts && userPosts.length > 0 ? (
          userPosts.map(post => <PostCard key={post._id.$oid} post={post} users={users} />)
        ) : (
          <p className="text-center">You haven't written any posts yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
