import React from 'react';

function PostModal({ post, users, onClose }) {
  const author = users.find(u => u._id === post.authorId);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h1>{post.title}</h1>
        <p className="text-muted">By {author ? author.name : 'Unknown'}</p>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
    </div>
  );
}

export default PostModal;