import React, { useState } from 'react';
import api from '../api';

function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/login' : '/api/register';
    const payload = isLogin ? { email, password } : { name, username, email, password, bio, followers: 0, following: 0, postsCount: 0 };
    
    try {
      const response = await api.post(endpoint, payload);
      if (isLogin) {
        onLogin(response); 
      } else {
        alert("Registration successful! Please login.");
        setIsLogin(true); 
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1 className="auth-title">Words</h1>
        <p className="auth-subtitle">A minimalist space for writers</p>
        <div className="form-tabs">
          <button className={`tab-btn ${isLogin ? 'tab-btn--active' : ''}`} onClick={() => setIsLogin(true)}>Login</button>
          <button className={`tab-btn ${!isLogin ? 'tab-btn--active' : ''}`} onClick={() => setIsLogin(false)}>Register</button>
        </div>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group"><label className="form-label">Full Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control" required /></div>
              <div className="form-group"><label className="form-label">Username</label><input type="text" value={username} onChange={e => setUsername(e.target.value)} className="form-control" required /></div>
              <div className="form-group"><label className="form-label">Bio</label><textarea value={bio} onChange={e => setBio(e.target.value)} className="form-control" rows="3"></textarea></div>
            </>
          )}
          <div className="form-group"><label className="form-label">Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" required /></div>
          <div className="form-group"><label className="form-label">Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" required /></div>
          <button type="submit" className="btn btn--primary btn--full">{isLogin ? 'Login' : 'Register'}</button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;