import React from 'react';
import api from '../api';

function PostCard({ post, users, onPostClick }) {
  const author = users.find(u => u._id === post.authorId);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = dateString?.$date || dateString;
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const handleSummarize = async (e) => {
    e.stopPropagation(); 
    try {
      const result = await api.post('/api/summarize', { content: post.content });
      alert(`AI Summary:\n\n${result.summary}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <article className="post-card" onClick={() => onPostClick(post)}>
      <header className="post-card__header">
        <span className={`post-card__type post-card__type--${post.type}`}>{post.type}</span>
        <h2 className="post-card__title">{post.title}</h2>
      </header>
      <div 
        className="post-card__content" 
        dangerouslySetInnerHTML={{ __html: (post.content || '').substring(0, 150) + '...' }} 
      />
      <div className="post-card__meta">
        <a href="#" className="post-card__author">{author ? author.name : 'Unknown'}</a>
        <span className="post-card__date">{post.createdAt ? formatDate(post.createdAt) : ''}</span>
      </div>
      <div className="post-card__footer">
          <div className="post-card__tags">
              {post.tags && post.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
          </div>
          <button className="btn btn--sm" onClick={handleSummarize}>Summarize</button>
      </div>
    </article>
  );
}

export default PostCard;