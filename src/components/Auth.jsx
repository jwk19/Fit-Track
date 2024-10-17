import React, { useState, useEffect } from 'react';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Add a sample user if none exist
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      const sampleUser = { id: 1, username: 'user@example.com', password: 'password123' };
      localStorage.setItem('users', JSON.stringify([sampleUser]));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (isLogin) {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid credentials');
      }
    } else {
      if (users.some(u => u.username === username)) {
        setError('Username already exists');
      } else {
        const newUser = { id: Date.now(), username, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        onLogin(newUser);
      }
    }
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username or Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
        {isLogin ? 'Need to register?' : 'Already have an account?'}
      </button>
      {isLogin && (
        <p className="sample-credentials">
          Sample login: user@example.com / password123
        </p>
      )}
    </div>
  );
};

export default Auth;